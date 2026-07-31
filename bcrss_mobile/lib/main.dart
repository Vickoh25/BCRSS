import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = ColorScheme.fromSeed(
      seedColor: const Color(0xFF1F7A5A),
      brightness: Brightness.light,
    );

    return MaterialApp(
      title: 'BCRSS',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: colorScheme,
        textTheme: GoogleFonts.interTextTheme(),
        useMaterial3: true,
      ),
      home: const HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('BCRSS'),
        backgroundColor: colorScheme.surface,
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            Text(
              'Baraton Community Resource Sharing',
              style: GoogleFonts.playfairDisplay(
                fontSize: 30,
                fontWeight: FontWeight.w700,
                color: colorScheme.onSurface,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Share farm tools, textbooks, household items, and local work opportunities.',
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 24),
            const _FeatureTile(
              icon: Icons.handshake_outlined,
              title: 'Borrow Resources',
              subtitle: 'Find available tools and items from nearby members.',
            ),
            const _FeatureTile(
              icon: Icons.work_outline,
              title: 'Find Jobs',
              subtitle: 'Browse casual jobs, tutoring, skilled trade, and farm work.',
            ),
            const _FeatureTile(
              icon: Icons.star_outline,
              title: 'Build Trust',
              subtitle: 'Use reviews and request history to keep exchanges accountable.',
            ),
          ],
        ),
      ),
    );
  }
}

class _FeatureTile extends StatelessWidget {
  const _FeatureTile({
    required this.icon,
    required this.title,
    required this.subtitle,
  });

  final IconData icon;
  final String title;
  final String subtitle;

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: DecoratedBox(
        decoration: BoxDecoration(
          border: Border.all(color: colorScheme.outlineVariant),
          borderRadius: BorderRadius.circular(8),
        ),
        child: ListTile(
          leading: Icon(icon, color: colorScheme.primary),
          title: Text(title),
          subtitle: Text(subtitle),
        ),
      ),
    );
  }
}
