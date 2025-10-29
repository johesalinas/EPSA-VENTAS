import 'package:flutter/material.dart';
import 'list_page.dart';

class DataSheetSectionsPage extends StatelessWidget {
  const DataSheetSectionsPage({super.key});

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
      appBar: AppBar(title: const Text('Data Sheets')),
      body: ListView.separated(
        itemCount: sorted.length,
        separatorBuilder: (_, __) => const Divider(height: 1),
        itemBuilder: (_, i) => ListTile(
          leading: const Icon(Icons.folder),
          title: Text(sorted[i]),
          onTap: () => Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => DataSheetListPage(section: sorted[i])),
          ),
        ),
      ),
    );
  }
}
