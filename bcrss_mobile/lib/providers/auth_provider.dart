import 'package:flutter/material.dart';
import '../services/api_service.dart';

class AuthProvider with ChangeNotifier {
  final ApiService _apiService;
  bool _isLoading = false;
  bool _isAuthenticated = false;
  String? _token;
  Map<String, dynamic>? _user;

  AuthProvider(this._apiService);

  bool get isLoading => _isLoading;
  bool get isAuthenticated => _isAuthenticated;
  Map<String, dynamic>? get user => _user;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await _apiService.login(email, password);
      if (response['success']) {
        _isAuthenticated = true;
        _token = response['token'];
        _user = response['user'];
        _isLoading = false;
        notifyListeners();
        return true;
      }
    } catch (e) {
      // Handle error
    }

    _isLoading = false;
    notifyListeners();
    return false;
  }

  void logout() {
    _isAuthenticated = false;
    _token = null;
    _user = null;
    notifyListeners();
  }
}
