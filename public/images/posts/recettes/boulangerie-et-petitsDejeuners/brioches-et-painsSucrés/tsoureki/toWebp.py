from PIL import Image
import os
import glob

# --- Paramètres de configuration ---
EXTENSIONS = ('.jpg', '.jpeg', '.png', '.bmp', '.tiff')
QUALITE_WEBP = 90
INCLURE_SOUS_DOSSIERS = False  # True pour inclure les sous-dossiers
FICHIER_SORTIE = "couleurs_dominantes.txt"

# --- Chemin du dossier contenant le script ---
DOSSIER_SCRIPT = os.path.dirname(os.path.abspath(__file__))


def extraire_couleur_dominante(image: Image.Image) -> str:
    """
    Extrait la couleur dominante d'une image et la retourne au format hexadécimal (#rrggbb).
    """
    # On réduit la taille pour accélérer le calcul
    image = image.resize((50, 50))
    image = image.convert('RGB')
    couleurs = image.getcolors(50 * 50)  # Retourne une liste [(count, (r,g,b))]
    couleur_dominante = max(couleurs, key=lambda t: t[0])[1]
    return "#{:02x}{:02x}{:02x}".format(*couleur_dominante)


def convertir_en_webp():
    pattern = "**/*" if INCLURE_SOUS_DOSSIERS else "*"
    fichiers = glob.glob(os.path.join(DOSSIER_SCRIPT, pattern), recursive=INCLURE_SOUS_DOSSIERS)

    images_trouvees = [f for f in fichiers if f.lower().endswith(EXTENSIONS)]
    if not images_trouvees:
        print("Aucune image trouvée.")
        return

    print(f"{len(images_trouvees)} image(s) trouvée(s). Conversion en cours...\n")

    lignes_resultats = []

    for chemin_image in images_trouvees:
        try:
            base, _ = os.path.splitext(chemin_image)
            sortie = base + ".webp"
            nom_fichier = os.path.basename(base)

            if os.path.exists(sortie):
                print(f"⏭️  Déjà convertie : {os.path.basename(sortie)}")
                continue

            with Image.open(chemin_image) as img:
                couleur_hex = extraire_couleur_dominante(img)
                img.convert("RGB").save(sortie, "webp", quality=QUALITE_WEBP)
                lignes_resultats.append(f"{nom_fichier} : {couleur_hex}")
                print(f"✅ {os.path.basename(chemin_image)} → {os.path.basename(sortie)} | Couleur : {couleur_hex}")

        except Exception as e:
            print(f"❌ Erreur avec {chemin_image} : {e}")

    if lignes_resultats:
        chemin_fichier_sortie = os.path.join(DOSSIER_SCRIPT, FICHIER_SORTIE)
        with open(chemin_fichier_sortie, "w", encoding="utf-8") as f:
            f.write("\n".join(lignes_resultats))
        print(f"\n🎨 Couleurs dominantes enregistrées dans : {FICHIER_SORTIE}")

    print("\nConversion terminée !")


if __name__ == "__main__":
    convertir_en_webp()
