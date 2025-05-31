{
  description = "JavaScript/TypeScript development environment with Bun and Node.js";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # JavaScript/TypeScript Runtime & Package Managers
            bun
            nodejs_20

            # Development Tools
            git
            curl
            wget
          ];

          shellHook = ''
            echo "🚀 Development Environment Ready!"
            echo "📦 Available tools:"
            echo "  - Bun: $(bun --version)"
            echo "  - Node.js: $(node --version)"
            echo "  - NPM: $(npm --version)"
            echo ""
            echo "💡 Quick start:"
            echo "  - bun init (create new project with Bun)"
            echo "  - bun install (install dependencies)"
            echo "  - bun run dev (run development server)"
            echo ""
          '';

          # Environment variables
          NIX_SHELL_PRESERVE_PROMPT = 1;
        };
      });
}
