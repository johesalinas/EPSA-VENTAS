import 'package:flutter/material.dart';
import 'list_page.dart';

class PlansSectionsPage extends StatelessWidget {
  const PlansSectionsPage({super.key});

  // mismas secciones que Data Sheets
  static const sections = [
    'Choice Bagging Equipment',
    'CV Technology',
    'Cycloner',
    'Dust Control and Loading',
    'Lorenz Conveying Products',
    'Modern Process Equipment',
    'National Bulk Equipment',
    'Prater Industries',
    'Ricelake Weighing',
    'Tecweigh',
  ];

  @override
  Widget build(BuildContext context) {
    final sorted = [...sections]..sort();
    return Scaffold(
      appBar: AppBar(title: const Text('Planos')),
      body: ListView.separated(
        itemCount: sorted.length,
        separatorBuilder: (_, __) => const Divider(height: 1),
        itemBuilder: (_, i) => ListTile(
          leading: const Icon(Icons.folder),
          title: Text(sorted[i]),
          onTap: () => Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => PlansListPage(section: sorted[i])),
          ),
        ),
      ),
    );
  }
}
