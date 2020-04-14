/* @flow */
import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Trans } from "react-i18next";
import type { Account, Operation } from "@ledgerhq/live-common/lib/types";
import { accountAndParentScreenSelector } from "../../reducers/accounts";
import { TrackScreen } from "../../analytics";
import colors from "../../colors";
import PreventNativeBack from "../../components/PreventNativeBack";
import ValidateSuccess from "../../components/ValidateSuccess";

type Props = {
  account: Account,
  navigation: any,
  route: { params: RouteParams },
};

type RouteParams = {
  accountId: string,
  deviceId: string,
  transaction: any,
  result: Operation,
};

const ValidationSuccess = ({ navigation, route, account }: Props) => {
  const transaction = route.params.transaction;
  const resource = transaction.resource || "";

  const onClose = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
  }, [navigation]);

  const goToOperationDetails = useCallback(() => {
    if (!account) return;
    const result = route.params.result;
    if (!result) return;
    navigation.navigate("OperationDetails", {
      accountId: account.id,
      operation: result,
    });
  }, [navigation, account, route.params.result]);

  return (
    <View style={styles.root}>
      <TrackScreen category="UnfreezeFunds" name="ValidationSuccess" />
      <PreventNativeBack />
      <ValidateSuccess
        onClose={onClose}
        onViewDetails={goToOperationDetails}
        title={<Trans i18nKey="unfreeze.validation.success" />}
        description={
          <Trans
            i18nKey="unfreeze.validation.info"
            values={{ resource: resource.toLowerCase() }}
          />
        }
      />
    </View>
  );
};

ValidationSuccess.navigationOptions = {
  header: null,
  gesturesEnabled: false,
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  button: {
    alignSelf: "stretch",
    marginTop: 24,
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  label: { fontSize: 12 },
  subLabel: { color: colors.grey },
});

const mapStateToProps = accountAndParentScreenSelector;

export default connect(mapStateToProps)(ValidationSuccess);
