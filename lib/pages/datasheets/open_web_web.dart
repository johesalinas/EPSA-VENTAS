import 'package:web/web.dart' as web;

/// Abre el PDF desde /assets/... en la MISMA pestaña (mejor para iOS PWA/offline)
void openPdfOnWeb(String assetPath) {
  final encoded = Uri.encodeFull(assetPath); // convierte espacios -> %20
  try {
    web.window.location.assign(encoded); // preferido
  } catch (_) {
    web.window.open(encoded, '_self');   // fallback equivalente
  }
}
