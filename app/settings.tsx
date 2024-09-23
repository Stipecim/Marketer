import React from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Card } from '@rneui/base';
import { usesettingsStore } from '../cache/settings';

type FormData = {
  ipOrDns: string;
};

export default function Settings() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const setIpAddress = usesettingsStore(state => state.setIpAddress);

  // Validation functions
  const isValidIPv4 = (ip: string) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Regex.test(ip);
  };

  const isValidIPv6 = (ip: string) => {
    const ipv6Regex = /([a-f0-9:]+:+)+[a-f0-9]+/i;
    return ipv6Regex.test(ip);
  };

  const isValidDNS = (hostname: string) => {
    const dnsRegex = /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;
    return dnsRegex.test(hostname);
  };

  // Handler for form submission
  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { ipOrDns } = data;
    if (isValidIPv4(ipOrDns) || isValidIPv6(ipOrDns) || isValidDNS(ipOrDns)) {
      setIpAddress(ipOrDns); 
    } else {
      console.log("Invalid IP/DNS");
    }
  };

  return (
    <Card>
    <View style={styles.container}>
      <Text style={styles.label}>Enter IP Address or DNS:</Text>

      {/* Controller from react-hook-form to manage the input */}
      <Controller
        control={control}
        name="ipOrDns"
        rules={{ required: 'This field is required' }} // Adding required validation
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter IP or DNS"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      
      {/* Display validation error */}
      {errors.ipOrDns && <Text style={styles.errorText}>{errors.ipOrDns.message}</Text>}

      <Button title="Apply" onPress={handleSubmit(onSubmit)} />
    </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%', // Card will take 90% of the screen width
    alignSelf: 'center', // Center the card horizontally
    padding: 20, // Control internal padding of the card
    marginVertical: 20, // Add space around the card
    borderRadius: 10, // Optional: round corners for aesthetics
  },
  container: {
    // flex: 1,
    // padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20, // Add some space above the button
    alignItems: 'center', // Center the button horizontally
  }

});