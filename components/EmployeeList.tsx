import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { View } from './Themed';
import { Center } from './Center';
import { Title } from './Title';
import { Badge } from './Badge';
import { JobTitle } from '../interfaces';


type Employee = {
  name: string;
  email: string;
  phone: string;
  jobTitle: JobTitle;
}

interface Props {
  labels: string[];
  employees: Employee[];
}

export const EmployeeList: React.FC<Props> = ({ labels, employees }) => {
  return (
    <Center>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 40, marginTop: 200 }}>
        {
          labels.map((label, idx) => (
            <Title size='sm' bold key={idx}>{label}</Title>
          ))
        }
      </View>

      {
        employees.map((employee, idx) => (
          <SafeAreaView key={idx}>
            <ScrollView style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 40, width: "100%" }}>
              <View style={{
                display: "flex", flexDirection: "row", gap: 5, justifyContent: "center",
                alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#ccc", paddingBottom: 5
              }}
              >
                <Title size='sm'>{employee.name}</Title>
                <Title size='sm'>{employee.email}</Title>
                <Title size='sm'>{employee.phone}</Title>
                <Badge type={employee.jobTitle}>{employee.jobTitle}</Badge>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </ScrollView>
          </SafeAreaView>
        ))
      }
    </Center>
  )
}
