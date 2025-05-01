import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';
import { PositionalTrade } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const mockTrades: PositionalTrade[] = [
  {
    symbol: 'CDSL',
    name: 'Central Depository Services (India) Ltd.',
    returnPercentage: 10.8,
    targetHitDate: '15 Oct 2024 09:16 am',
    term: 'Medium Term',
    type: 'Liquide (SEBI RA)',
  },
  {
    symbol: 'CGPOWER',
    name: 'CG Power and Industrial Solutions Ltd.',
    returnPercentage: 6.3,
    targetHitDate: '10 Oct 2024 09:40 am',
    term: 'Short Term',
    type: 'Liquide (SEBI RA)',
  },
];

const TradeHistoryCard: React.FC<{ trade: PositionalTrade }> = ({ trade }) => (
  <LinearGradient
    colors={colors.gradient.card}
    style={styles.tradeCard}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.tradeHeader}>
      <View style={styles.symbolContainer}>
        <Text style={styles.symbol}>{trade.symbol}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {trade.name}
        </Text>
      </View>
      <Text style={[styles.return, { color: trade.returnPercentage >= 0 ? colors.success : colors.error }]}>
        {trade.returnPercentage >= 0 ? '+' : ''}{trade.returnPercentage}%
      </Text>
    </View>
    <View style={styles.tradeDetails}>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Target Hit</Text>
        <Text style={styles.detailValue}>{trade.targetHitDate}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Term</Text>
        <Text style={styles.detailValue}>{trade.term}</Text>
      </View>
      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Type</Text>
        <Text style={styles.detailValue}>{trade.type}</Text>
      </View>
    </View>
  </LinearGradient>
);

export const TradeHistoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Positional');
  const tabs = ['Positional', 'Flash', 'My trades'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-left" size={28} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Trade History</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsCard}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>59 days</Text>
          <Text style={styles.statLabel}>Avg duration</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>7.74%</Text>
          <Text style={styles.statLabel}>Avg return</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>83%</Text>
          <Text style={styles.statLabel}>Hit rate</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>244 trades</Text>

      <ScrollView style={styles.tradeList}>
        {mockTrades.map((trade, index) => (
          <TradeHistoryCard key={index} trade={trade} />
        ))}
      </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
  activeTabText: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 24,
    marginHorizontal: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    marginBottom: 24,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  sectionTitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tradeList: {
    flex: 1,
  },
  tradeCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  symbolContainer: {
    flex: 1,
    marginRight: 16,
  },
  symbol: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  return: {
    fontSize: 18,
    fontWeight: '600',
  },
  tradeDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  detailValue: {
    fontSize: 14,
    color: colors.text.primary,
    fontWeight: '500',
  },
}); 