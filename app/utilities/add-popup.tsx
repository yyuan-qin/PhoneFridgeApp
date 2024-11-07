import { ActionSheetIOS} from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export const addOptionPopUp = (navigation: NavigationProp<any>) => {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Scan', 'Search'],
            cancelButtonIndex: 0,
        },
        (buttonIndex) => {
            if (buttonIndex === 1) {
                alert('Scan');
            } else if (buttonIndex === 2) {
                navigation.navigate('./search');
            }
        }
    )
}