// @flow

import React, { PureComponent, Fragment } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";

import colors from "../../colors";
import OnboardingHeader from "./OnboardingHeader";

type Container = { children: *, style?: *, noHorizontalPadding?: boolean };

type Props = Container & {
  isCentered?: boolean,
  isFull?: boolean,
  noHorizontalPadding?: boolean,
  borderedFooter?: boolean,
  header?: string,
  withSkip?: boolean,
  Footer?: React$ComponentType<*>,
};

export default class OnboardingLayout extends PureComponent<Props> {
  render() {
    const {
      children,
      header,
      Footer,
      isCentered,
      isFull,
      noHorizontalPadding,
      borderedFooter,
      style,
      withSkip,
    } = this.props;

    let inner: React$Node = children;

    if (isCentered) {
      inner = (
        <Fragment>
          <View>{inner}</View>
          {Footer && (
            <View style={styles.centeredFooter}>
              <Footer />
            </View>
          )}
        </Fragment>
      );
    }

    if (isFull) {
      inner = (
        <OnboardingInner noHorizontalPadding={noHorizontalPadding}>
          {inner}
        </OnboardingInner>
      );
    }

    if (header) {
      inner = (
        <Fragment>
          <OnboardingHeader stepId={header} withSkip={withSkip} />
          <OnboardingInner noHorizontalPadding={noHorizontalPadding}>
            {inner}
          </OnboardingInner>
          {Footer && (
            <View
              style={[styles.footer, borderedFooter && styles.borderedFooter]}
            >
              <Footer />
            </View>
          )}
        </Fragment>
      );
    }

    return (
      <SafeAreaView style={[styles.root, isCentered && styles.centered, style]}>
        {inner}
      </SafeAreaView>
    );
  }
}

export class OnboardingInner extends PureComponent<Container> {
  render() {
    return (
      <ScrollView style={[styles.inner]}>
        <View
          style={[
            styles.innerInner,
            this.props.noHorizontalPadding && styles.noHorizontalPadding,
          ]}
        >
          {this.props.children}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  inner: {
    flexGrow: 1,
  },
  innerInner: {
    padding: 16,
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
  footer: {
    padding: 16,
  },
  borderedFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.lightFog,
  },
  centeredFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightFog,
  },
});