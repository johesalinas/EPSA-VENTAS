import 'package:flutter/material.dart';
import 'package:epsa_ventas/pages/datasheets/sections_page.dart';
import 'package:flutter_launcher_icons/xml_templates.dart';
import 'package:url_launcher/url_launcher_string.dart';
import 'package:epsa_ventas/pages/plans/sections_page.dart'; // 👈 nuevo

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    Widget tile(String text, VoidCallback onTap, {double h = 120}) {
      return InkWell(
        onTap: onTap,
        child: Container(
          height: h,
          decoration: BoxDecoration(
            color: cs.primary,
            borderRadius: BorderRadius.circular(12),
            boxShadow: kElevationToShadow[2],
          ),
          alignment: Alignment.center,
          padding: const EdgeInsets.all(12),
          child: Text(text, textAlign: TextAlign.center,
              style: TextStyle(color: Color(0xffffffff), letterSpacing: 1.2)),
        ),
      );
    }

    return SingleChildScrollView(
      padding: const EdgeInsets.all(12),
      child: Column(
        children: [
          Row(
            children: [
              Expanded(child: tile('FORMULARIO DE\nVISITA', () {
                launchUrlString('https://forms.gle/oCgTbsf6uGCzage88');
              })),
              const SizedBox(width: 12),
              Expanded(child: tile('DATA SHEETS', () {
                Navigator.of(context).push(
                  MaterialPageRoute(builder: (_) => const DataSheetSectionsPage()),
                );
              })),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Expanded(child: tile('STORY\nTELLINGS', () {
                launchUrlString('https://drive.google.com/drive/folders/1utFLJ9Sj9gcXdkd0HmJIvzNu-L665-SO?usp=sharing');
              })),
              const SizedBox(width: 12),
              Expanded(child: tile('REPORTE DE\nPENDIENTES', () {
                launchUrlString('https://docs.google.com/spreadsheets/d/1kLkJxReWrApVfLeV-jMmC_cX8zvhD3xRB4WgnNOqv3I/edit?gid=753004487');
              })),
            ],
          ),
          const SizedBox(height: 12),
          tile('PLANOS', () {
            Navigator.of(context).push(
              MaterialPageRoute(builder: (_) => const PlansSectionsPage()),
            );
          }, h: 140),
        ],
      ),
    );
  }
}

