import React from 'react';
import { View, Button, Text, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setServerIp } from '../cache/slices/settingsSlice'; // Ensure this path is correct

type FormData = {
  ipOrDns: string;
};

export default function Settings() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const dispatch = useDispatch();

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
      dispatch(setServerIp(ipOrDns)); // Dispatch to Redux store
    } else {
      console.log("Invalid IP/DNS");
    }
  };

  return (
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

      <Button title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }
});