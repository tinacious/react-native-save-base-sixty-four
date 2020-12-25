import * as React from 'react';
import { Alert } from 'react-native';

type AlertsType = {
  showPermissionsRequired: () => void;
  showSuccess: () => void;
  showFailure: () => void;
};

export const useAlerts = (): AlertsType => {
  const showPermissionsRequired = React.useCallback(() => {
    const title = 'Permissions Required';
    const message =
      'Unable to perform this operation until you accept the permissions';

    Alert.alert(title, message);
  }, []);

  const showSuccess = React.useCallback(() => {
    const title = 'Success 😄';
    const message = 'The image was successfully saved to your gallery';

    Alert.alert(title, message);
  }, []);

  const showFailure = React.useCallback(() => {
    const title = 'Fail 😭';
    const message = 'The image failed to save to your gallery';

    Alert.alert(title, message);
  }, []);

  return {
    showSuccess,
    showFailure,
    showPermissionsRequired,
  };
};
