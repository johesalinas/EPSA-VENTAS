import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:path_provider/path_provider.dart';
import 'package:open_filex/open_filex.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/foundation.dart' show kIsWeb;

// reutilizamos los mismos helpers web
import '../../pages/datasheets/open_web.dart'
if (dart.library.html) '../../pages/datasheets/open_web_web.dart';

class PlanDoc {
  final String name;
  final String assetPath; // puede ser PDF, PNG, etc.
  PlanDoc(this.name, this.assetPath);
}

// TODO: rellena con tus rutas reales dentro de assets/plans/...
final Map<String, List<PlanDoc>> plansLibrary = {
  'Cycloner': [
    // Ejemplos:
    // PlanDoc('Cyclone A - Layout', 'assets/plans/CYA/CycloneA_Layout.pdf'),
    // PlanDoc('Cyclone A - Soporte', 'assets/plans/CYA/CycloneA_Support.png'),
  ],
  'Lorenz Conveying Products': [
    // PlanDoc('Slide Gate - Ensamble', 'assets/plans/LCP/SlideGate_Assy.pdf'),
  ],
  'National Bulk Equipment': [
    // PlanDoc('BBU - Layout', 'assets/plans/NBE/BBU_Layout.pdf'),
  ],
  'Tecweigh': [
    // PlanDoc('Weigh Belt - GA', 'assets/plans/TWI/WeighBelt_GA.pdf'),
  ],
  'CV Technology': [
    PlanDoc('INTERCEPTOR FV 5 IN', 'assets/pdfs/Planos/CVT/INTERCEPTOR_FV_5IN.pdf'),
    PlanDoc('RUPTURE PANEL 24X36 IN', 'assets/pdfs/Planos/CVT/RUPTURE_PANEL_24X36IN.pdf'),
  ],
  'Modern Process Equipment': [
    // PlanDoc('ChainVey - Routing', 'assets/plans/MPE/ChainVey_Routing.pdf'),
  ],
  'Dust Control and Loading': [
    // PlanDoc('Spout - Layout', 'assets/plans/DCL/Spout_Layout.pdf'),
  ],
  'Choice Bagging Equipment': [
    // PlanDoc('CBE - Skid', 'assets/plans/CHO/CBE_Skid.pdf'),
  ],
  'Prater Industries': [],
  'Ricelake Weighing': [],
};

class PlansListPage extends StatelessWidget {
  final String section;
  const PlansListPage({super.key, required this.section});

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
    final items = plansLibrary[section] ?? const <PlanDoc>[];

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
                  // 🌐 WEB: abrir directamente el asset (PDF/imagen) en la misma pestaña
                  openPdfOnWeb(item.assetPath);
                } else {
                  // 📱 ANDROID/iOS: abrir con app externa
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
