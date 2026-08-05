import 'package:http/http.dart' as http;
import 'dart:convert';

class ApiService {
  static const String baseUrl = 'https://bcrss-backend.onrender.com/api';
  
  static Future<List<dynamic>> getResources() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/resources/'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('Error fetching resources: $e');
    }
    return [];
  }

  static Future<List<dynamic>> getJobs() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/jobs/'),
      );
      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      }
    } catch (e) {
      print('Error fetching jobs: $e');
    }
    return [];
  }
}
