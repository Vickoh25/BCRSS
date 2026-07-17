import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl = 'https://bcrss-backend.onrender.com/api';

  Future<Map<String, dynamic>> login(String email, String password) async {
    // Placeholder login implementation
    await Future.delayed(const Duration(seconds: 1));
    if (email == 'user@example.com' && password == 'password') {
      return {
        'success': true,
        'token': 'placeholder_token',
        'user': {'email': email, 'name': 'Demo User'}
      };
    }
    return {'success': false, 'message': 'Invalid credentials'};
  }

  Future<List<dynamic>> getResources() async {
    // Placeholder for fetching resources
    await Future.delayed(const Duration(seconds: 1));
    return [
      {'id': '1', 'title': 'Resource 1', 'description': 'Description 1'},
      {'id': '2', 'title': 'Resource 2', 'description': 'Description 2'},
    ];
  }
}
