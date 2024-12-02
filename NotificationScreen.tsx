
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const mockNotifications = {
  likes: [
    { id: '1', user: 'Alice', message: 'liked your post.', time: '2h ago' },
    { id: '2', user: 'Bob', message: 'liked your comment.', time: '1d ago' },
  ],
  comments: [
    { id: '3', user: 'Charlie', message: 'commented on your post.', time: '3h ago' },
  ],
  alerts: [
    { id: '4', user: 'System', message: 'Your profile is 80% complete.', time: '5d ago' },
  ],
};

const mockMessages = [
  { id: '1', user: 'Alice', lastMessage: 'See you later!', time: '2m ago' },
  { id: '2', user: 'Bob', lastMessage: 'Thanks for the update!', time: '1h ago' },
  { id: '3', user: 'Charlie', lastMessage: 'Let’s catch up soon!', time: '2d ago' },
];

const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState('likes');

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.message}>{item.lastMessage}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs for Notifications */}
      <View style={styles.tabs}>
        {['likes', 'comments', 'alerts'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
              {tab === 'likes' ? 'Likes' : tab === 'comments' ? 'Comments' : 'Alerts'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification List */}
      <FlatList
        data={mockNotifications[selectedTab]}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        style={styles.notificationList}
      />

      {/* Messages Section */}
      <Text style={styles.sectionTitle}>Messages</Text>
      <FlatList
        data={mockMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', padding: 10 },
  tabs: { flexDirection: 'row', marginBottom: 10 },
  tab: { flex: 1, padding: 10, alignItems: 'center', borderBottomWidth: 2, borderColor: 'gray' },
  activeTab: { borderColor: 'red' },
  tabText: { fontSize: 16, color: 'gray' },
  activeTabText: { color: 'red', fontWeight: 'bold' },
  notificationList: { flex: 1, marginBottom: 20 },
  notificationItem: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
  userName: { fontWeight: 'bold', fontSize: 16 },
  message: { fontSize: 14, color: '#555' },
  time: { fontSize: 12, color: '#999', textAlign: 'right' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10 },
  messageList: { flex: 1 },
  messageItem: { padding: 10, borderBottomWidth: 1, borderColor: '#eee' },
});

export default NotificationScreen;
