import datetime

def anstataŭigi_string_en_dosiero(dosiero_vojo, malnova_string, komenca, fina):
    anstaŭigo = 0
    try:
        with open(dosiero_vojo, 'r', encoding='utf-8') as dosiero:
            dosiero_datoj = dosiero.read()

        nuna_dato_kaj_horo = datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        nova_string_kun_dato_horo = f"{komenca}{nuna_dato_kaj_horo}{fina}"

        dosiero_datoj, anstaŭigo = dosiero_datoj.replace(malnova_string, nova_string_kun_dato_horo), dosiero_datoj.count(malnova_string)

        with open(dosiero_vojo, 'w', encoding='utf-8') as dosiero:
            dosiero.write(dosiero_datoj)

        print(f"{anstaŭigo} fojo(j) la signo '{malnova_string}' anstataŭigita per '{nova_string_kun_dato_horo}' en la dosiero '{dosiero_vojo}' sukcese.")
    except FileNotFoundError:
        print(f"Dosiero '{dosiero_vojo}' ne trovita.")
    except Exception as e:
        print(f"Eraro okazis: {str(e)}")
    return anstaŭigo

# Ekzemplo de uzo:
dosiero_vojo = "eoth-vortaro.js"
malnova_string = "++"
komenca = "@"
fina = "@"

anstaŭigo = anstataŭigi_string_en_dosiero(dosiero_vojo, malnova_string, komenca, fina)
print(f"Redaktitaj vortoj: {anstaŭigo}")
