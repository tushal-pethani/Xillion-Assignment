import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Trade } from '../types';
import { colors } from '../theme/colors';

interface TradeCardProps {
  trade: Trade;
}

export const TradeCard: React.FC<TradeCardProps> = ({ trade }) => {
  return (
    <LinearGradient
      colors={colors.gradient.card}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.symbol}>{trade.symbol}</Text>
        <Text style={styles.return}>+{trade.expectedReturn}%</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <Text style={styles.label}>Buy</Text>
          <Text style={styles.value}>₹{trade.buy.min}-{trade.buy.max}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Stop Loss</Text>
          <Text style={styles.value}>₹{trade.stopLoss}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Target</Text>
          <Text style={styles.value}>₹{trade.target}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  return: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.success,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
}); 