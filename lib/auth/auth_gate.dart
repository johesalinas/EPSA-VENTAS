// lib/auth/auth_gate.dart
import 'package:flutter/material.dart';
import 'auth_service.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../main.dart'; // para navegar a Shell

class AuthGate extends StatefulWidget {
  const AuthGate({super.key});

  @override
  State<AuthGate> createState() => _AuthGateState();
}

class _AuthGateState extends State<AuthGate> {
  final _formKey = GlobalKey<FormState>();
  final _emailCtrl = TextEditingController();
  final _pinCtrl = TextEditingController();
  bool _loading = true;
  bool _obscure = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _checkSession();
  }

  Future<void> _checkSession() async {
    final ok = await AuthService.instance.isLoggedIn();
    if (!mounted) return;
    if (ok) {
      _goHome();
    } else {
      setState(() => _loading = false);
    }
  }

  void _goHome() {
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const Shell()),
    );
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() { _error = null; _loading = true; });

    final msg = await AuthService.instance.loginWithEmailAndPin(
      _emailCtrl.text,
      _pinCtrl.text,
    );

    if (!mounted) return;
    if (msg != null) {
      setState(() { _error = msg; _loading = false; });
    } else {
      _goHome();
    }
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;

    if (_loading) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator(color: cs.primary)),
      );
    }

    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // 👇 Logo EPSA fuera de la caja
              SvgPicture.asset(
                'assets/branding/epsa_logo.svg',
                height: 250,
                fit: BoxFit.contain,
              ),
              const SizedBox(height: 0),

              // 👇 Caja con el formulario
              ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 420),
                child: Card(
                  color: cs.primary,
                  margin: const EdgeInsets.all(8),
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(
                            'Acceso EPSA',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: Theme.of(context).colorScheme.onPrimary,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 20),

                          // Campo de correo
                          TextFormField(
                            controller: _emailCtrl,
                            keyboardType: TextInputType.emailAddress,
                            decoration: const InputDecoration(
                              labelText: 'Correo',
                              prefixIcon: Icon(Icons.mail_outline),
                            ),
                            validator: (v) {
                              if (v == null || v.trim().isEmpty) return 'Ingresa tu correo';
                              final ok = RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(v.trim());
                              if (!ok) return 'Correo inválido';
                              return null;
                            },
                          ),
                          const SizedBox(height: 12),

                          // Campo PIN
                          TextFormField(
                            controller: _pinCtrl,
                            obscureText: _obscure,
                            decoration: InputDecoration(
                              labelText: 'PIN',
                              prefixIcon: const Icon(Icons.password_outlined),
                              suffixIcon: IconButton(
                                icon: Icon(_obscure ? Icons.visibility : Icons.visibility_off),
                                onPressed: () => setState(() => _obscure = !_obscure),
                              ),
                            ),
                            validator: (v) {
                              if (v == null || v.isEmpty) return 'Ingresa el PIN';
                              if (v.length < 4) return 'PIN mínimo de 4 dígitos';
                              return null;
                            },
                          ),

                          if (_error != null) ...[
                            const SizedBox(height: 12),
                            Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
                          ],
                          const SizedBox(height: 20),

                          // Botón
                          SizedBox(
                            width: double.infinity,
                            child: FilledButton.icon(
                              onPressed: _submit,
                              icon: const Icon(Icons.lock_open),
                              label: const Text('Ingresar'),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );

  }
}
