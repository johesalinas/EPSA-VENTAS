import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:path_provider/path_provider.dart';
import 'package:open_filex/open_filex.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

// Import condicional: usa el stub en mobile y la impl real en web.
import '../../pages/datasheets/open_web.dart'
if (dart.library.html) '../../pages/datasheets/open_web_web.dart';

class PDF {
  final String name;
  final String assetPath;
  PDF(this.name, this.assetPath);
}

final Map<String, List<PDF>> library = {
  'Cycloner': [
    PDF('Customer Data Sheet', 'assets/pdfs/DataSheets/CYA/CYA-DS.pdf'),
  ],
  'Lorenz Conveying Products': [
    PDF('Valve Application Form', 'assets/pdfs/DataSheets/LCP/LCP-SLIDE GATE-DS.pdf'),
  ],
  'National Bulk Equipment': [
    PDF('Bulk Bag Discharger', 'assets/pdfs/DataSheets/NBE/BBU Application DataSheet.pdf'),
    PDF('Bulk Bag Filler', 'assets/pdfs/DataSheets/NBE/BBF Application DataSheet.pdf'),
    PDF('Container Discharger', 'assets/pdfs/DataSheets/NBE/Cotainer Discharge Application DataSheet.pdf'),
  ],
  'Tecweigh': [
    PDF('Volumetric Feeder', 'assets/pdfs/DataSheets/TWI/NewVolumetric 1.3.pdf'),
    PDF('Weigh Belt Feeder', 'assets/pdfs/DataSheets/TWI/Weigh Belt Feeder 1.5.pdf'),
    PDF('Belt Scale', 'assets/pdfs/DataSheets/TWI/Belt Scale Data Sheet 1.4.pdf'),
    PDF('Gravimetric Feeder', 'assets/pdfs/DataSheets/TWI/NewGravimetric 1.4.pdf'),
    PDF('Bulk Bag Unloader', 'assets/pdfs/DataSheets/TWI/New Bulk Bag Unloader 1.3.pdf'),
  ],
  'CV Technology': [
    PDF('Cartridge Dust Collector', 'assets/pdfs/DataSheets/CVT/Worksheet_Cartridge_DC.pdf'),
    PDF('Round Dust Collector', 'assets/pdfs/DataSheets/CVT/5049_03 EP Worksheet Round DC.pdf'),
    PDF('Rectangular Dust Collector', 'assets/pdfs/DataSheets/CVT/5050_03 EP Worksheet Rect DC.pdf'),
    PDF('Bucket Elevator', 'assets/pdfs/DataSheets/CVT/5066_03 EP Worksheet Bucket Elevator.pdf'),
    PDF('Round Bin Silo', 'assets/pdfs/DataSheets/CVT/5067_03 EP Worksheet Round Bin-Silo.pdf'),
    PDF('Rectangular Bin Silo', 'assets/pdfs/DataSheets/CVT/5093_02 EP Worksheet Rect Bin-Silo.pdf'),
    PDF('Spray Dryer', 'assets/pdfs/DataSheets/CVT/5095_02 EP Worksheet Spray Dryer.pdf'),
    PDF('Cyclone', 'assets/pdfs/DataSheets/CVT/5094_02 EP Worksheet Cyclone.pdf'),
  ],
  'Modern Process Equipment': [
    PDF('Chain Vey', 'assets/pdfs/DataSheets/MPE/MPE-Chain Vey-DS.pdf'),
  ],
  'Dust Control and Loading': [
    PDF('Slide Gate', 'assets/pdfs/DataSheets/DCL/DCL-SLIDE GATE-DS.pdf'),
    PDF('Loading Spouts', 'assets/pdfs/DataSheets/DCL/DCL-LOADING SPOUTS-DS.pdf'),
  ],
  'Choice Bagging Equipment': [
    PDF('Application Data Sheet', 'assets/pdfs/DataSheets/CHO/CBE-DS.pdf'),
  ],
  'Prater Industries': [],
  'Ricelake Weighing': [],
};

class DataSheetListPage extends StatelessWidget {
  final String section;
  const DataSheetListPage({super.key, required this.section});

  /// Copia el asset temporalmente (solo Android/iOS) para abrir con apps externas.
  Future<File> _materializeAsset(String assetPath) async {
    final cleanPath = assetPath.trim().replaceAll('"', '').replaceAll("'", '');
    final bytes = await rootBundle.load(cleanPath);
    final temp = await getTemporaryDirectory();

    final relative = cleanPath.split('assets/').last;
    final out = File('${temp.path}/$relative');

    await out.parent.create(recursive: true);
    await out.writeAsBytes(bytes.buffer.asUint8List());
    return out;
  }

  @override
  Widget build(BuildContext context) {
    final items = library[section] ?? const <PDF>[];

    return Scaffold(
      appBar: AppBar(title: Text(section)),
      body: ListView.separated(
        itemCount: items.length,
        separatorBuilder: (_, __) => const Divider(height: 1),
        itemBuilder: (_, i) {
          final item = items[i];
          return ListTile(
            leading: SvgPicture.asset(
              'assets/branding/docs_icon.svg',
              height: 28,
              colorFilter: ColorFilter.mode(
                Theme.of(context).colorScheme.onPrimary,
                BlendMode.srcIn,
              ),
            ),
            title: Text(item.name),
            //subtitle: Text(item.assetPath, maxLines: 1, overflow: TextOverflow.ellipsis),
            trailing: const Icon(Icons.arrow_right),
            onTap: () async {
              try {
                if (kIsWeb) {
                  // 🌐 WEB: abre desde /assets/... (PWA/offline)
                  openPdfOnWeb(item.assetPath);
                } else {
                  // 📱 ANDROID/iOS: abre con app externa
                  final file = await _materializeAsset(item.assetPath);
                  final result = await OpenFilex.open(file.path);

                  if (result.type != ResultType.done && context.mounted) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('No se pudo abrir: ${result.message}')),
                    );
                  }
                }
              } catch (e) {
                if (!context.mounted) return;
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Error abriendo archivo: $e')),
                );
              }
            },
          );
        },
      ),
    );
  }
}

