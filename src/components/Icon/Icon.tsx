import { Image } from 'react-native';

import { theme } from '../../theme';
import type { ImageStyle } from 'react-native';
import type { ImagesTypes } from '../../theme/images';
import type { ImageProps } from 'react-native';

export interface IconProps extends Omit<ImageProps, 'source'> {
  size?: number;
  color?: string;
  name?: ImagesTypes;
  style?: ImageStyle;
  disabledColor?: boolean;
}

export function Icon(props: IconProps) {
  const {
    color = theme.colors.white,
    size = 24,
    name,
    disabledColor,
    style,
    ...rest
  } = props;

  const icon = theme.images[name || 'arrow_left_regular'];

  return (
    <Image
      {...rest}
      source={icon}
      style={[
        {
          width: size,
          height: size,
          tintColor: disabledColor ? undefined : color,
        },
        style,
      ]}
      resizeMode={'contain'}
    />
  );
}
