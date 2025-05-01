import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    buySellPrice: 1250,
    targetPrice: 1385,
  },
  {
    symbol: 'CGPOWER',
    name: 'CG Power and Industrial Solutions Ltd.',
    returnPercentage: 6.3,
    targetHitDate: '10 Oct 2024 09:40 am',
    term: 'Short Term',
    type: 'Liquide (SEBI RA)',
    buySellPrice: 475,
    targetPrice: 505,
  },
  {
    symbol: 'YESBANK',
    name: 'Yes Bank Ltd.',
    returnPercentage: -3.2,
    targetHitDate: '09 Oct 2024 10:25 am',
    term: 'Short Term',
    type: 'Liquide (SEBI RA)',
    buySellPrice: 22.15,
    targetPrice: 21.45,
  },
  {
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    returnPercentage: 12.6,
    targetHitDate: '05 Oct 2024 11:30 am',
    term: 'Medium Term',
    type: 'Liquide (SEBI RA)',
    buySellPrice: 835,
    targetPrice: 940,
  },
];

const calculateMonthlyReturns = () => {
  // This would normally calculate from actual data
  return [
    { month: 'Aug', return: 7.2 },
    { month: 'Sep', return: 12.4 },
    { month: 'Oct', return: 9.1 },
    { month: 'Nov', return: -2.3 },
    { month: 'Dec', return: 14.2 },
    { month: 'Jan', return: 8.5 },
  ];
};

const monthlyReturns = calculateMonthlyReturns();

const TradeHistoryCard: React.FC<{ trade: PositionalTrade }> = ({ trade }) => {
  const isProfit = trade.returnPercentage >= 0;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <LinearGradient
      colors={colors.gradient.card}
      style={styles.tradeCard}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.tradeCardContent}>
        <View style={styles.tradeHeader}>
          <View style={styles.symbolContainer}>
            <View style={styles.symbolWrapper}>
              <View style={[styles.symbolBadge, { backgroundColor: isProfit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
                <Text style={styles.symbolText}>{trade.symbol.substring(0, 1)}</Text>
              </View>
              <View style={styles.symbolTextContainer}>
                <Text style={styles.symbol}>{trade.symbol}</Text>
                <Text style={styles.name} numberOfLines={1}>
                  {trade.name}
                </Text>
              </View>
            </View>
            <View style={[styles.returnBadge, { backgroundColor: isProfit ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)' }]}>
              <Text style={[styles.return, { color: isProfit ? colors.text.success : colors.text.danger }]}>
                {isProfit ? '+' : ''}{trade.returnPercentage}%
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />
        
        <View style={styles.tradeDetails}>
          <View style={styles.detailsColumn}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Target Hit</Text>
              <Text style={styles.detailValue} numberOfLines={1}>{trade.targetHitDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Term</Text>
              <Text style={styles.detailValue}>{trade.term}</Text>
            </View>
          </View>
          <View style={styles.detailsColumn}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>{isProfit ? 'Buy Price' : 'Sell Price'}</Text>
              <Text style={styles.detailValue}>₹{trade.buySellPrice}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Target Price</Text>
              <Text style={[styles.detailValue, { color: isProfit ? colors.text.success : colors.text.danger }]}>
                ₹{trade.targetPrice}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.viewDetailsButton}
          onPress={() => setShowDetails(true)}
        >
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text.secondary} />
        </TouchableOpacity>
      </View>

      {/* Trade Details Modal - Improved */}
      <Modal
        visible={showDetails}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDetails(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { width: '92%' }]}>
            <LinearGradient
              colors={colors.gradient.card}
              style={styles.tradeDetailsModal}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.tradeDetailsHeader}>
                <View style={styles.tradeDetailsHeaderContent}>
                  <LinearGradient
                    colors={isProfit ? ['rgba(16, 185, 129)', 'rgba(16, 185, 129)'] : ['rgba(239, 68, 68)', 'rgba(239, 68, 68)']}
                    style={styles.tradeDetailsBadge}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={[styles.tradeDetailsSymbol, { color: isProfit ? colors.text.success : colors.text.danger }]}>
                      {trade.symbol}
                    </Text>
                  </LinearGradient>
                  <Text style={styles.tradeDetailsName}>{trade.name}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowDetails(false)}
                >
                  <Ionicons name="close" size={24} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <View style={styles.tradeDetailsReturnSection}>
                <View style={styles.tradeDetailsReturnContent}>
                  <Text style={styles.tradeDetailsReturnLabel}>Return</Text>
                  <Text style={[styles.tradeDetailsReturnValue, { color: isProfit ? colors.text.success : colors.text.danger }]}>
                    {isProfit ? '+' : ''}{trade.returnPercentage}%
                  </Text>
                </View>
                <LinearGradient
                  colors={isProfit ? colors.gradient.success : colors.gradient.danger}
                  style={styles.tradeDetailsTrendBadge}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons 
                    name={isProfit ? "trending-up" : "trending-down"} 
                    size={16} 
                    color="#FFFFFF" 
                  />
                </LinearGradient>
              </View>

              <View style={styles.tradeDetailsInfoSection}>
                <View style={styles.tradeDetailsInfoRow}>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Entry Price</Text>
                    <Text style={styles.tradeDetailsInfoValue}>₹{trade.buySellPrice}</Text>
                  </View>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Exit Price</Text>
                    <Text style={styles.tradeDetailsInfoValue}>₹{trade.targetPrice}</Text>
                  </View>
                </View>
                
                <View style={styles.tradeDetailsInfoRow}>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Entry Date</Text>
                    <Text style={styles.tradeDetailsInfoValue}>10 Oct 2024 09:00 am</Text>
                  </View>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Exit Date</Text>
                    <Text style={styles.tradeDetailsInfoValue}>{trade.targetHitDate}</Text>
                  </View>
                </View>
                
                <View style={styles.tradeDetailsInfoRow}>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Term</Text>
                    <Text style={styles.tradeDetailsInfoValue}>{trade.term}</Text>
                  </View>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Type</Text>
                    <Text style={styles.tradeDetailsInfoValue}>{trade.type}</Text>
                  </View>
                </View>
                
                <View style={styles.tradeDetailsInfoRow}>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Holding Period</Text>
                    <Text style={styles.tradeDetailsInfoValue}>5 days</Text>
                  </View>
                  <View style={styles.tradeDetailsInfoItem}>
                    <Text style={styles.tradeDetailsInfoLabel}>Status</Text>
                    <Text style={[styles.tradeDetailsInfoValue, { color: isProfit ? colors.text.success : colors.text.danger }]}>
                      {isProfit ? 'Target Hit' : 'Stop Loss Hit'}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.tradeDetailsCloseButton}
                onPress={() => setShowDetails(false)}
              >
                <LinearGradient
                  colors={colors.gradient.primary}
                  style={styles.tradeDetailsCloseGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.tradeDetailsCloseText}>Close</Text>
                </LinearGradient>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const PerformanceGraph: React.FC = () => {
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 months');
  const periods = ['Last 3 months', 'Last 6 months', 'Last 1 year', 'Year to date', 'All time'];

  return (
    <View style={styles.graphContainer}>
      <View style={styles.graphHeader}>
        <Text style={styles.graphTitle}>Monthly Returns</Text>
        <TouchableOpacity 
          style={styles.periodSelector}
          onPress={() => setShowPeriodDropdown(true)}
        >
          <Text style={styles.periodText}>{selectedPeriod}</Text>
          <Ionicons 
            name="chevron-down" 
            size={16} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
      </View>
      
      {/* Period Selector Modal */}
      <Modal
        visible={showPeriodDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPeriodDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={() => setShowPeriodDropdown(false)}
        >
          <View style={styles.periodDropdownContainer}>
            <View style={styles.periodDropdownHeader}>
              <Text style={styles.periodDropdownTitle}>Select Period</Text>
              <TouchableOpacity onPress={() => setShowPeriodDropdown(false)}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.periodDropdownContent}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodDropdownItem,
                    selectedPeriod === period && styles.selectedPeriodDropdownItem
                  ]}
                  onPress={() => {
                    setSelectedPeriod(period);
                    setShowPeriodDropdown(false);
                  }}
                >
                  <Text 
                    style={[
                      styles.periodDropdownItemText,
                      selectedPeriod === period && styles.selectedPeriodDropdownItemText
                    ]}
                  >
                    {period}
                  </Text>
                  {selectedPeriod === period && (
                    <View style={styles.checkmarkContainer}>
                      <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      
      <View style={styles.chartContainer}>
        <View style={styles.graph}>
          {monthlyReturns.map((item, index) => {
            const isPositive = item.return >= 0;
            const barColor = isPositive ? colors.text.success : colors.text.danger;
            const gradientColors = isPositive 
              ? ['rgba(16, 185, 129, 1.0)', 'rgba(5, 150, 105, 0.5)'] 
              : ['rgba(239, 68, 68, 1.0)', 'rgba(185, 28, 28, 0.5)'];
            
            return (
              <View key={index} style={styles.graphBarContainer}>
                <Text style={[styles.graphValue, { color: barColor }]}>
                  {isPositive ? '+' : ''}{item.return}%
                </Text>
                <View style={styles.barWrapper}>
                  <LinearGradient
                    colors={gradientColors}
                    style={[
                      styles.graphBar,
                      { height: Math.abs(item.return) * 4 }
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                  />
                </View>
              </View>
            );
          })}
        </View>
        
        {/* X-axis line */}
        <View style={styles.xAxisLine} />
        
        {/* Month labels moved below the x-axis */}
        <View style={styles.monthLabelsContainer}>
          {monthlyReturns.map((item, index) => (
            <View key={index} style={styles.monthLabelWrapper}>
              <Text style={styles.graphMonth}>{item.month}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export const TradeHistoryScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Positional');
  const tabs = ['Positional', 'Flash', 'My trades'];
  const [selectedFilter, setSelectedFilter] = useState('All trades');
  const filters = ['All trades', 'This month', 'Last month'];
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Enhanced filter options with selected state
  const [selectedOptions, setSelectedOptions] = useState({
    dateRange: 'All time',
    tradeType: 'All types',
    status: 'All status'
  });

  type FilterKey = 'dateRange' | 'tradeType' | 'status';

  const filterOptions = [
    { title: 'Date Range', key: 'dateRange' as FilterKey, options: ['All time', 'This month', 'Last month', 'Last 3 months', 'Custom'] },
    { title: 'Trade Type', key: 'tradeType' as FilterKey, options: ['All types', 'Buy', 'Sell', 'Short'] },
    { title: 'Status', key: 'status' as FilterKey, options: ['All status', 'Target hit', 'Stop loss hit', 'Active'] },
  ];

  // Handle filter option selection
  const handleFilterSelect = (key: FilterKey, value: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [key]: value
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Trade History</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Ionicons name="funnel-outline" size={20} color={colors.text.primary} />
        </TouchableOpacity>
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
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
      
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.filtersRow}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, selectedFilter === filter && styles.selectedFilterChip]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text 
                style={[
                  styles.filterChipText, 
                  selectedFilter === filter && styles.selectedFilterChipText
                ]}
              >
                {filter}
              </Text>
              {selectedFilter === filter && (
                <View style={styles.filterChipDot} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <LinearGradient
          colors={colors.gradient.card}
          style={styles.statsCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.stat}>
            <Text style={styles.statValue}>59 days</Text>
            <Text style={styles.statLabel}>Avg duration</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>7.74%</Text>
            <Text style={styles.statLabel}>Avg return</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>83%</Text>
            <Text style={styles.statLabel}>Hit rate</Text>
          </View>
        </LinearGradient>
        
        <PerformanceGraph />

        <View style={styles.tradesHeader}>
          <Text style={styles.sectionTitle}>Trade History</Text>
          <Text style={styles.tradeCount}>244 trades</Text>
        </View>

        <View style={styles.tradeListContainer}>
          <ScrollView 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tradeListContent}
            decelerationRate="fast"
            snapToAlignment="center"
            snapToInterval={SCREEN_WIDTH * 0.85 + 16} // Increased width
            pagingEnabled
          >
            {mockTrades.map((trade, index) => (
              <View key={index} style={styles.tradeCardWrapper}>
                <TradeHistoryCard trade={trade} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Enhanced Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { height: SCREEN_WIDTH * 1.2 }]}>
            <LinearGradient
              colors={colors.gradient.card}
              style={styles.filterModalContent}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.filterModalHeader}>
                <View>
                  <Text style={styles.filterModalTitle}>Filter Trades</Text>
                  <Text style={styles.filterModalSubtitle}>Customize your trade history view</Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setShowFilterModal(false)}
                >
                  <Ionicons name="close" size={24} color={colors.text.primary} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.filterOptionsScroll}>
                {filterOptions.map((section, index) => (
                  <View key={index} style={styles.filterSection}>
                    <Text style={styles.filterSectionTitle}>{section.title}</Text>
                    <View style={styles.filterOptionsRow}>
                      {section.options.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.filterOption,
                            selectedOptions[section.key] === option && styles.selectedFilterOption
                          ]}
                          onPress={() => handleFilterSelect(section.key, option)}
                        >
                          <Text 
                            style={[
                              styles.filterOptionText,
                              selectedOptions[section.key] === option && styles.selectedFilterOptionText
                            ]}
                          >
                            {option}
                          </Text>
                          {selectedOptions[section.key] === option && (
                            <View style={styles.filterOptionCheck}>
                              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.filterModalFooter}>
                <TouchableOpacity 
                  style={styles.filterResetButton}
                  onPress={() => {
                    setSelectedOptions({
                      dateRange: 'All time',
                      tradeType: 'All types',
                      status: 'All status'
                    });
                  }}
                >
                  <Text style={styles.filterResetText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.filterApplyButton}
                  onPress={() => setShowFilterModal(false)}
                >
                  <LinearGradient
                    colors={colors.gradient.primary}
                    style={styles.filterApplyGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Text style={styles.filterApplyText}>Apply Filters</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>
      </Modal>
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
    paddingTop: Platform.OS === 'ios' ? 48 : 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    letterSpacing: 0.3,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  tab: {
    paddingVertical: 16,
    marginRight: 24,
    position: 'relative',
  },
  activeTab: {
    // Styling will be via the indicator instead
  },
  tabText: {
    color: colors.text.secondary,
    fontSize: 16,
    letterSpacing: 0.2,
  },
  activeTabText: {
    color: colors.text.primary,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.text.primary,
    borderRadius: 3,
  },
  scrollContent: {
    flex: 1,
  },
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10, // Increased from 8
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  selectedFilterChip: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)', // Purple tint for selected
    borderColor: colors.text.accent,
  },
  filterChipText: {
    color: colors.text.secondary,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  selectedFilterChipText: {
    color: colors.text.accent,
    fontWeight: '600',
  },
  filterChipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text.accent,
    marginLeft: 6,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
  graphContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  graphHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Increased from 16
  },
  graphTitle: {
    fontSize: 18, // Increased from 16
    fontWeight: '600',
    color: colors.text.primary,
    letterSpacing: 0.2,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  periodText: {
    fontSize: 14,
    color: colors.text.primary,
    marginRight: 8,
  },
  chartContainer: {
    position: 'relative',
  },
  graph: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 10,
  },
  graphBarContainer: {
    alignItems: 'center',
    flex: 1,
  },
  graphValue: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  barWrapper: {
    // Creates a shadow effect around the bar
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  graphBar: {
    width: 38,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    // Add a subtle border for better definition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  xAxisLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginTop: 0,
  },
  monthLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  monthLabelWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  graphMonth: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.text.secondary,
    letterSpacing: 0.1,
  },
  tradesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    letterSpacing: 0.2,
  },
  tradeCount: {
    fontSize: 14,
    color: colors.text.secondary,
    letterSpacing: 0.1,
  },
  tradeListContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    height: 260, // Further increased height for better visibility
  },
  tradeListContent: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  tradeCardWrapper: {
    width: SCREEN_WIDTH * 0.85,
    marginRight: 16,
    height: 250,
  },
  tradeCard: {
    height: '100%',
    borderRadius: 16, // Increased border radius for better aesthetics
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tradeCardContent: {
    padding: 16,
    height: '100%',
    justifyContent: 'space-between', // Better distribution of content
    flexDirection: 'column',
  },
  tradeHeader: {
    marginBottom: 10,
  },
  symbolContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  symbolWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take available space
    marginRight: 12, // Add margin to prevent overlap
  },
  symbolTextContainer: {
    flex: 1, // Allow text to take available space
    marginRight: 8,
  },
  symbolBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  symbolText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  name: {
    fontSize: 14,
    color: colors.text.secondary,
    width: '100%', // Use full width
    letterSpacing: 0.1,
  },
  returnBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
    minWidth: 80, // Ensure consistent width
    alignItems: 'center', // Center the text
  },
  return: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
    width: '100%',
  },
  tradeDetails: {
    flexDirection: 'row',
    marginBottom: 16,
    width: '100%',
  },
  detailsColumn: {
    flex: 1,
    paddingRight: 8, // Increased padding between columns
  },
  detailItem: {
    marginBottom: 12, // Increased spacing between items
  },
  detailLabel: {
    fontSize: 13,
    color: colors.text.tertiary,
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  detailValue: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10, // Increased padding for better touch target
    backgroundColor: 'rgba(255, 255, 255, 0.07)', // Slightly more visible
    borderRadius: 12, // Increased border radius
    marginTop: 'auto', // Push to bottom
  },
  viewDetailsText: {
    fontSize: 14,
    color: colors.text.secondary,
    marginRight: 4,
    fontWeight: '500', // Added weight for better visibility
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Darker overlay for better contrast
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '92%', // Slightly wider
    maxWidth: 360, // Increased from 340
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
  },
  modalContent: {
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  periodDropdownContainer: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    width: '85%',
    backgroundColor: '#171F2F',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 20,
  },
  periodDropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  periodDropdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  periodDropdownContent: {
    maxHeight: 300,
  },
  periodDropdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  selectedPeriodDropdownItem: {
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
  },
  periodDropdownItemText: {
    fontSize: 16,
    color: colors.text.primary,
  },
  selectedPeriodDropdownItemText: {
    fontWeight: 'bold',
    color: colors.text.accent,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.text.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeDetailsModal: {
    padding: 24, // Increased from 20
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)', // Increased contrast
  },
  tradeDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  tradeDetailsHeaderContent: {
    flex: 1,
    marginRight: 16,
  },
  tradeDetailsBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14, // Increased from 12
    paddingVertical: 8, // Increased from 6
    borderRadius: 10, // Increased from 8
    marginBottom: 10, // Increased from 8
  },
  tradeDetailsSymbol: {
    fontSize: 18, // Increased from 16
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  tradeDetailsName: {
    fontSize: 17, // Increased from 16
    color: colors.text.primary,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  tradeDetailsReturnSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)', // Increased from 0.05
    padding: 18, // Increased from 16
    borderRadius: 14, // Increased from 12
    marginBottom: 22, // Increased from 20
  },
  tradeDetailsReturnContent: {
    flex: 1,
  },
  tradeDetailsReturnLabel: {
    fontSize: 15, // Increased from 14
    color: colors.text.secondary,
    marginBottom: 6, // Increased from 4
    letterSpacing: 0.2,
  },
  tradeDetailsReturnValue: {
    fontSize: 28, // Increased from 24
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  tradeDetailsTrendBadge: {
    width: 42, // Increased from 36
    height: 42, // Increased from 36
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeDetailsInfoSection: {
    marginBottom: 24, // Increased from 20
  },
  tradeDetailsInfoRow: {
    flexDirection: 'row',
    marginBottom: 18, // Increased from 16
  },
  tradeDetailsInfoItem: {
    flex: 1,
  },
  tradeDetailsInfoLabel: {
    fontSize: 13, // Increased from 12
    color: colors.text.tertiary,
    marginBottom: 4, // Increased from 2
    letterSpacing: 0.1,
  },
  tradeDetailsInfoValue: {
    fontSize: 16, // Increased from 15
    color: colors.text.primary,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  tradeDetailsCloseButton: {
    height: 52, // Increased from 48
    borderRadius: 14, // Increased from 12
    overflow: 'hidden',
  },
  tradeDetailsCloseGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tradeDetailsCloseText: {
    fontSize: 17, // Increased from 16
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterModalContent: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    height: '100%',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  filterModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  filterModalSubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    letterSpacing: 0.2,
  },
  filterOptionsScroll: {
    flex: 1,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 14,
    letterSpacing: 0.2,
  },
  filterOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  selectedFilterOption: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderColor: colors.text.accent,
  },
  filterOptionText: {
    fontSize: 15,
    color: colors.text.secondary,
    letterSpacing: 0.2,
  },
  selectedFilterOptionText: {
    color: colors.text.accent,
    fontWeight: '600',
  },
  filterOptionCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.text.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  filterModalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  filterResetButton: {
    flex: 1,
    marginRight: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  filterResetText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.secondary,
    letterSpacing: 0.2,
  },
  filterApplyButton: {
    flex: 2,
    height: 52,
    borderRadius: 14,
    overflow: 'hidden',
  },
  filterApplyGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterApplyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
}); 