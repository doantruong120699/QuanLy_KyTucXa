import psycopg2
import os
import datetime
from datetime import timezone
from datetime import date  
from dotenv import load_dotenv
import logging
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(dotenv_path=os.path.join(BASE_DIR, '.env'))

def update_contract(is_expired, id_contract):
    """ update contract is_expired  """
    sql = """ UPDATE api_contract
                SET is_expired = %s
                WHERE id = %s"""
    conn = None
    updated_rows = 0
    try:
        conn = psycopg2.connect(host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'), user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'))
        cur = conn.cursor()
        cur.execute(sql, (is_expired, id_contract))
        updated_rows = cur.rowcount
        conn.commit()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

    return updated_rows

def get_contracts():
    conn = None
    # now_time = datetime.datetime.now().replace(tzinfo=timezone.utc)
    now_time = date.today()
    try:
        conn = psycopg2.connect(host=os.getenv('DB_HOST'), database=os.getenv('DB_NAME'), user=os.getenv('DB_USER'), password=os.getenv('DB_PASSWORD'))
        cur = conn.cursor()
        cur.execute("SELECT * FROM api_contract ORDER BY id")
        row = cur.fetchone()

        while row is not None:
            start_time = row[3]
            end_time = row[4]
            id_contract = row[0]
            # print("Start time: {0}, End time: {1}, Now: {2}".format(start_time, end_time, now_time))
            if start_time <= now_time and now_time <= end_time:
                update_contract(False, id_contract)
            else:
                update_contract(True, id_contract)
            row = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

# if __name__ == '__main__':
#     get_contracts()

from apscheduler.schedulers.blocking import BlockingScheduler

def update_status_contract():
    logger.error("Call Update")
    get_contracts()

scheduler = BlockingScheduler()
scheduler.add_job(update_status_contract, 'interval', seconds=10)
# scheduler.add_job(update_status_contract, trigger='cron', hour='00', minute='00')
scheduler.start()