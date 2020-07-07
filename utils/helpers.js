import * as Notifications from 'expo-notifications';
const NOTIFICATION_KEY = 'UdaciCard:notifications'
import { AsyncStorage } from "react-native"


export const DECKS_KEY = 'UdaciCard:decks'

export function formatNewDeck(title) {
    return {
            title: title,
            questions: []
    }
}


export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}





export function setLocalNotification () {
    console.log('Notification Setted')
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {

        Notifications.cancelAllScheduledNotificationsAsync()

        let trigger = new Date()
        trigger.setHours(20)
        trigger.setMinutes(0)

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Answer your Decks!',
                body: "👋 don't forget to Answer your Decks for today!",
            },
                trigger,
      })
        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
      }
    })
}