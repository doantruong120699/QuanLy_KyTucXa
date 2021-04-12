import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import moment from 'moment';

import './styles.scss';
import { Button, Link, Image, View } from '../Common';
import { LocationCheckinSchedule, PATH } from 'utils/constants';
import { AuthActions } from 'redux/authRedux';
import i18n from 'assets/i18n';
import { shouldShowLocationCheckin } from 'utils/momentUtils';
import { isValidDateOrder } from 'validations/commonValidation';

const Navbar = ({ history, authData, checkin }) => {
  const refInterval = useRef(null);

  const [toggleNavbar, setToggleNavbar] = useState(false);
  const [showWaving, setShowWaving] = useState(false);

  const handleNavigateSignup = () => {
    setToggleNavbar(!toggleNavbar);
    history.push(PATH.Signup);
  };

  const handleNavigateHemicPortal = () => {
    setToggleNavbar(!toggleNavbar);
    history.push(PATH.HemicPortal);
    window.location.reload();
  };

  const handleNavigateConnectWell = () => {
    setToggleNavbar(!toggleNavbar);
    history.push(PATH.ConnectWell);
    window.location.reload();
  };

  const { isAuthenticated } = authData;

  const isSignup = history.location.pathname === PATH.Signup;
  const isAddPrimary = history.location.pathname === PATH.TravelerAddPrimary;

  const userFullname = () => {
    const { cognitoUser } = authData;
    if (
      !cognitoUser?.attributes?.given_name &&
      !cognitoUser?.attributes?.family_name
    )
      return 'Apple Account';

    return `${cognitoUser?.attributes?.given_name} ${cognitoUser?.attributes?.family_name}`;
  };

  const isShowCheckin =
    !!checkin?.quarantinePeriodId && isValidDateOrder(new Date(), checkin?.to);

  const checkWaving = () => {
    const isShowDailyCheckin = moment()
      .startOf('day')
      .isAfter(moment(checkin?.lastDailyCheckedIn));

    const isShowLocationCheckin = shouldShowLocationCheckin(
      LocationCheckinSchedule,
      checkin?.lastLocationCheckedIn
    );

    setShowWaving(isShowDailyCheckin || isShowLocationCheckin);
  };

  useEffect(() => {
    clearInterval(refInterval.current);

    checkWaving();
    refInterval.current = setInterval(() => {
      checkWaving();
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkin]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setToggleNavbar(false);
      }}
    >
      <nav
        className={cn('cmp-navbar navbar is-fixed-top')}
        role="navigation"
        aria-label="main navigation"
      >
        <View className="container">
          <View className={cn('cmp-navbar__brand', 'navbar-brand')}>
            <Link className={cn('justify-center')} href={PATH.Welcome}>
              <Image name="Lumisight_logo" className={cn('cmp-navbar__logo')} />
            </Link>
            <button
              className={cn('cmp-navbar__burger navbar-burger burger', {
                'is-active': toggleNavbar === true,
              })}
              aria-label="menu"
              aria-expanded="false"
              data-target="lumisightTravel"
              onClick={() => setToggleNavbar(!toggleNavbar)}
              onKeyDown={() => setToggleNavbar(!toggleNavbar)}
              tabIndex={0}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </View>

          <View
            id="lumisightTravel"
            className={cn('navbar-menu', {
              'is-active': toggleNavbar === true,
            })}
          >
            {!isAddPrimary && (
              <View className={cn('cmp-navbar__end navbar-end')}>
                <Link
                  onClick={() => setToggleNavbar(!toggleNavbar)}
                  className={cn(
                    'cmp-navbar__end--item cmp-navbar__end--item--link'
                  )}
                  href={PATH.Home}
                  label={i18n.t('Home')}
                  activeClassName={cn('cmp-navbar__end--item--active')}
                />
                {isAuthenticated && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.Trips}
                    label={i18n.t('Manage Trips')}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                  />
                )}

                {isAuthenticated && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.Travelers}
                    label={i18n.t('Manage Travelers')}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                  />
                )}

                {isAuthenticated && isShowCheckin && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.Checkin}
                    label={i18n.t('Check-in')}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                    showWaving={showWaving}
                  />
                )}

                {isAuthenticated && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.Exemptions}
                    label={i18n.t('Manage Exemptions')}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                  />
                )}

                {isAuthenticated && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.MyProfile}
                    label={userFullname()}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                  />
                )}

                {!isAuthenticated && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.ExemptionRequest}
                    label={i18n.t('Request Exemption')}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                  />
                )}

                {!isAuthenticated && (
                  <Link
                    onClick={() => setToggleNavbar(!toggleNavbar)}
                    className={cn(
                      'cmp-navbar__end--item cmp-navbar__end--item--link'
                    )}
                    href={PATH.Signin}
                    label={i18n.t('Log In')}
                    activeClassName={cn('cmp-navbar__end--item--active')}
                  />
                )}
                {!isAuthenticated && (
                  <Button
                    className={cn(
                      'cmp-navbar__end--item',
                      'cmp-navbar__end--item--button',
                      isSignup && 'cmp-navbar__end--item--disabled',
                      'hide-on-mobile'
                    )}
                    size="normal"
                    title={i18n.t('Create New Account')}
                    onClick={handleNavigateSignup}
                  />
                )}
                {!isAuthenticated && (
                  <Button
                    className={cn(
                      'cmp-navbar__end--item',
                      'cmp-navbar__end--item--button',
                      isSignup && 'cmp-navbar__end--item--disabled',
                      'hide-on-mobile'
                    )}
                    size="normal"
                    title={i18n.t('HEMIC GuideWire Portal')}
                    onClick={handleNavigateHemicPortal}
                  />
                )}
                {!isAuthenticated && (
                  <Button
                    className={cn(
                      'cmp-navbar__end--item',
                      'cmp-navbar__end--item--button',
                      isSignup && 'cmp-navbar__end--item--disabled',
                      'hide-on-mobile'
                    )}
                    size="normal"
                    title="Connect Well"
                    onClick={handleNavigateConnectWell}
                  />
                )}
              </View>
            )}
          </View>
        </View>
      </nav>
    </OutsideClickHandler>
  );
};

const mapStateToProps = (state) => ({
  authData: state.auth,
  checkin: state.auth.checkin,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: (payload, onSuccess, onError) =>
    dispatch(AuthActions.logout(payload, onSuccess, onError)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
