import React from "react"
import * as SecureStore from "expo-secure-store";
import { View, Text, FlatList, ScrollView } from 'react-native'

export default class Contact extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            contact: [],
        }
    }

    async getContact() {
        try {
            let token = await SecureStore.getItemAsync("user_token")
            const response = await
                fetch('http://snapi.epitech.eu:8000/all', {
                    method: 'GET',
                    headers: {
                        'token': token
                    }
                })
            const json = await response.json()
            const contact = json.data
            this.setState({ contact: contact })
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getContact()
    }

    render() {
        const { contact } = this.state
        return (
            <ScrollView>
                {contact != [] ? contact.map((item, i) => (
                    <Text key={i}>{item.email}</Text>
                )) : null
                }
            </ScrollView>
        )
    }
}
