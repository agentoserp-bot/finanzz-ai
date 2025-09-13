export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Verifique seu email</h2>
        <p className="mb-6 text-gray-600">
          Enviamos um link de confirmação para o seu email. Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
        </p>
        <p className="text-sm text-gray-500">
          Não recebeu o email? Verifique sua pasta de spam ou{' '}
          <a href="/auth/login" className="text-blue-600 hover:underline">
            volte para o login
          </a>
        </p>
      </div>
    </div>
  );
}