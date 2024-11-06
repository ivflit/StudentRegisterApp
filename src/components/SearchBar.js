// src/components/SearchBar.js

import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';

const SearchBar = ({ students, onSelect }) => {
    const [query, setQuery] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);

    const handleSearch = (text) => {
        setQuery(text);
        setFilteredStudents(
            students.filter((student) =>
                student.name.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    return (
        <View style={{ marginBottom: 20 }}>
            <TextInput
                style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    paddingLeft: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                }}
                placeholder="Search for a student..."
                value={query}
                onChangeText={handleSearch}
            />
            {query.length > 0 && (
                <FlatList
                    data={filteredStudents}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderColor: '#ccc',
                            }}
                            onPress={() => onSelect(item)}
                        >
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default SearchBar;
