import React from "react";

import { View, Image } from "react-native";

const ActionBarImage = (props: any) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{
          uri: props.photo,
        }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 40 / 2,
          marginLeft: 15,
        }}
      />
    </View>
  );
};

export default ActionBarImage;
