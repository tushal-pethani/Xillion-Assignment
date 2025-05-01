import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TradeCard } from '../components/TradeCard';
import { SwipeableButton } from '../components/SwipeableButton';
import { colors } from '../theme/colors';
import { Trade, Portfolio } from '../types';

const mockPortfolio: Portfolio = {
  currentValue: 1278653,
  unusedFunds: 118261,
};

const mockTrades: Trade[] = [
  {
    symbol: 'ASHOKA',
    name: 'Ashoka Buildcon Ltd.',
    buy: { min: 248, max: 251 },
    stopLoss: 223,
    target: 273,
    expectedReturn: 10,
  },
  {
    symbol: 'IOLCP',
    name: 'IOL Chemicals Ltd.',
    buy: { min: 460, max: 470 },
    stopLoss: 350,
    target: 520,
    expectedReturn: 19,
  },
  {
    symbol: 'GENESYS',
    name: 'Genesys International',
    buy: { min: 775, max: 786 },
    stopLoss: 698,
    target: 852,
    expectedReturn: 8.3,
  },
];

export const HomeScreen: React.FC = () => {
  const [selectedTrades, setSelectedTrades] = useState<Trade[]>(mockTrades);

  const handleExecute = () => {
    Alert.alert(
      'Execute Trades',
      'Are you sure you want to execute these trades?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            Alert.alert('Success', 'Trades executed successfully!');
          },
        },
      ]
    );
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      style: 'currency',
      currency: 'INR',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="account-circle" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.logo}>XILLION</Text>
        <TouchableOpacity>
          <Icon name="bell" size={28} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <LinearGradient
          colors={colors.gradient.primary}
          style={styles.portfolioCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.portfolioLabel}>Current Portfolio</Text>
          <Text style={styles.portfolioValue}>
            {formatCurrency(mockPortfolio.currentValue)}
          </Text>
          <View style={styles.unusedFunds}>
            <Text style={styles.unusedFundsLabel}>Unused Funds</Text>
            <Text style={styles.unusedFundsValue}>
              {formatCurrency(mockPortfolio.unusedFunds)}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="chart-line" size={24} color={colors.text.primary} />
            <Text style={styles.actionText}>Portfolio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="robot" size={24} color={colors.text.primary} />
            <Text style={styles.actionText}>Ask AI</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Today's Recommendations</Text>
        {selectedTrades.map((trade, index) => (
          <TradeCard key={index} trade={trade} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          On executing this basket, buy orders along with stop loss and targets will be placed.
        </Text>
        <SwipeableButton onSwipeComplete={handleExecute} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  content: {
    flex: 1,
  },
  portfolioCard: {
    margin: 16,
    padding: 24,
    borderRadius: 24,
  },
  portfolioLabel: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  portfolioValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  unusedFunds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unusedFundsLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  unusedFundsValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: colors.text.primary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.background,
  },
  footerText: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 8,
  },
}); 