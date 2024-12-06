// import DynamicIcons,{IconProps,IconType} from 'react-native-dynamic-vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconProps} from 'type';

export type IconBaseProps = {
  type: any;
  icon: any;
} & Omit<IconProps, 'type' | 'name'>;

const CustomIcon = ({type, icon, ...props}: IconBaseProps) => {
  switch (type) {
    case 'AntDesign':
      return <AntDesign name={icon} {...props} />;
      break;
    case 'Entypo':
      return <Entypo name={icon} {...props} size={20} color={'black'} />;
      break;
    case 'EvilIcons':
      return <EvilIcons name={icon} {...props} />;
      break;
    case 'Feather':
      return <Feather name={icon} {...props} />;
      break;
    case 'FontAwesome':
      return <FontAwesome name={icon} {...props} />;
      break;
    case 'FontAwesome5':
      return <FontAwesome5 name={icon} {...props} />;
      break;
    case 'Fontisto':
      return <Fontisto name={icon} {...props} />;
      break;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={icon} {...props} />;
      break;
    case 'MaterialIcons':
      return <MaterialIcons name={icon} {...props} />;
      break;

    default:
      break;
  }

  // return <DynamicIcons type={IconType[type]} name={icon} {...props}/>
};

export default CustomIcon;
