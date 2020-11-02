import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import oauthGithub from '../services/auth/oauthGithub';

const LoggingIn = () => {
  const history = useHistory();
  const location = useLocation();
  const { code } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(async () => {
    try {
      await oauthGithub(code);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }, []);

  return <></>;
};

export default LoggingIn;
