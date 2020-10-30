import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
} from 'react-native';


interface StockItem {
  name: string;
  high24hr:string;
  low24hr:string;
}

export default function StockScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<StockItem[]>([])


  useEffect(() => {
    function fetchStock() {
      fetch('https://poloniex.com/public?command=returnTicker')
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json()
        })
        .then((data) => {
          let arr:StockItem[] = [];
          for (let prop in data)
          arr.push({name:prop,high24hr:data[prop].high24hr,low24hr:data[prop].low24hr })
          setData(arr);
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false))
    }

    fetchStock()
    const timer = setInterval(fetchStock, 5000)
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  
  if(isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>LOADING </Text>
      </View>
    )
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView style={styles.scrollView}>
        {data.map((item) => (
          <View key={item.name}>
            <Text style={styles.base}>
              <View style={{width:90}}>
                <Text style={styles.name}>{item.name} </Text>
              </View>
              <Text style={styles.high}> {item.high24hr} </Text>
              <Text style={styles.low}> {item.low24hr} </Text>
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    margin: 10,
  },
  base: {
    fontSize: 16,
    
  },
  name: {
    color: 'black',
    fontWeight:'bold'
  },
  high: {
    color: 'green',
    marginHorizontal:5,
  },
  low: {
    color: 'red',
    marginHorizontal:5,
  },
});
