import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const RegisterForm = ({ values, onChange, onSubmit, loading }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2"
        >
          Full Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={handleChange}
          placeholder="John Doe"
          variant="primary"
          size="md"
        />
      </div>

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

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2"
        >
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={values.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          variant="primary"
          size="md"
        />
      </div>

      <div>
        <label
          htmlFor="interests"
          className="block text-xs font-semibold tracking-[0.3em] uppercase text-white/60 mb-2"
        >
          Interests (Optional)
        </label>
        <Input
          id="interests"
          name="interests"
          type="text"
          value={values.interests}
          onChange={handleChange}
          placeholder="e.g., Web Development, AI, Data Science"
          variant="secondary"
          size="md"
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full" size="lg" variant="primary">
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default RegisterForm;
