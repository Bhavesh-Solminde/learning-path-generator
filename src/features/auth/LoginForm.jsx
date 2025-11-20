import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const LoginForm = ({ values, onChange, onSubmit, loading }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2"
        >
          Email Address
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
          placeholder="you@example.com"
          variant="primary"
          size="md"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={values.password}
          onChange={handleChange}
          placeholder="••••••••"
          variant="primary"
          size="md"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-white/70">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-white/20 bg-transparent text-white focus:ring-white/30"
          />
          <label htmlFor="remember-me" className="ml-2">
            Remember me
          </label>
        </div>

        <a href="#" className="text-white/70 hover:text-white">
          Forgot password?
        </a>
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg" variant="primary">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
