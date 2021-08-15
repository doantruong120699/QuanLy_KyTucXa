from datetime import date
from api.models import Stage, SchoolYear


def getStageNow(semester=None, school_year=None):
    today = date.today()

    stage = Stage.objects.filter(semester = semester, school_year=school_year)
    if len(stage) == 0:
        return 0
    stage = stage.first()

    if stage.stage1_started_at <= today and today <= stage.stage1_ended_at:
        return 1
    elif stage.stage2_started_at <= today and today <= stage.stage2_ended_at:
        return 2
    elif stage.stage3_started_at <= today and today <= stage.stage3_ended_at:
        return 3
    else:
        return 0
    
        

