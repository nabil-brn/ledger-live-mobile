// @flow

import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NavigationScreenProp } from "react-navigation";
import type { CryptoCurrency } from "@ledgerhq/live-common/lib/types";
import i18next from "i18next";

import { prepareCurrency } from "../../bridge/cache";
import { ScreenName } from "../../const";
import colors from "../../colors";
import { TrackScreen } from "../../analytics";
import SelectDevice from "../../components/SelectDevice";
import { connectingStep, currencyApp } from "../../components/DeviceJob/steps";
import StepHeader from "../../components/StepHeader";

const forceInset = { bottom: "always" };

type Props = {
  navigation: NavigationScreenProp<{
    params: {
      currency: CryptoCurrency,
    },
  }>,
};

type State = {};

class AddAccountsSelectDevice extends Component<Props, State> {
  static navigationOptions = {
    headerTitle: (
      <StepHeader
        title={i18next.t("common.device")}
        subtitle={i18next.t("send.stepperHeader.stepRange", {
          currentStep: "2",
          totalSteps: "3",
        })}
      />
    ),
  };

  componentDidMount() {
    const { navigation } = this.props;
    const currency = navigation.getParam("currency");
    // load ahead of time
    prepareCurrency(currency);
  }

  onSelectDevice = (meta: *) => {
    const { navigation } = this.props;
    const currency = navigation.getParam("currency");
    navigation.navigate(ScreenName.AddAccountsAccounts, { currency, ...meta });
  };

  render() {
    const { navigation } = this.props;
    const currency = navigation.getParam("currency");
    return (
      <SafeAreaView style={styles.root} forceInset={forceInset}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContainer}
        >
          <TrackScreen category="AddAccounts" name="SelectDevice" />
          <SelectDevice
            onSelect={this.onSelectDevice}
            steps={[connectingStep, currencyApp(currency)]}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
});

export default withTranslation()(AddAccountsSelectDevice);
