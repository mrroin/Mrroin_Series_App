import { setUseProxies } from "immer";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { Image, Button, View, TouchableOpacity, Alert } from "react-native";
import translate from "../../../../services/language";

interface IProps {
  image: any;
  name: any;
  price: any;
  navigation: any;
  description: any;
  setProduct: any;
  isCategory: any;
}

class Product extends React.Component<IProps> {
  render() {
    const {
      name,
      price,
      description,
      image,
      setProduct,
      isCategory,
    } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            setProduct({
              image: image,
              name: name,
              price: price,
              description: description,
            })
          }
        >
          <Image
            style={styles.productImg}
            source={{
              uri: image,
            }}
          />
          <Text style={{ ...styles.title }}>{translate(name ? name : "")}</Text>
          {!isCategory && (
            <Text style={styles.price}>
              $ {translate(price ? price + "" : "")}
            </Text>
          )}
          <Text style={styles.description}>
            {translate(description ? description : "")}
          </Text>
          {/* <Button
            title="Ver detalle"
            onPress={() =>
              this.props.navigation.navigate("Details", {
                name: this.props.name,
                price: this.props.price,
                image: this.props.image,
              })
            }
          /> */}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    marginBottom: 10,
    marginTop: 20,
  },
  name: {
    color: "#5a647d",
    fontWeight: "bold",
    fontSize: 30,
  },
  price: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImg: {
    height: 200,
  },
});

export default Product;
