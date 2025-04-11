import os.path
from datetime import datetime

dosierindiko = 'eoth-vortaro.js'

modifinita_tempo = os.path.getmtime(dosierindiko)
modifinita_tempo = datetime.fromtimestamp(modifinita_tempo).strftime('%d-%m-%Y %H:%M:%S')

eliga_dosiero_vojo = 'lasta_sxangxo.js'

with open(eliga_dosiero_vojo, 'w') as output_file:
    output_file.write(f" let lastaTempo = \"{modifinita_tempo}\";")

print(f"let lastaTempo = \"{modifinita_tempo}\";")
print("konservita al:", eliga_dosiero_vojo)

# ŝanĝi ++ al la nuna tempo

import datetime

def anstataŭigi_string_en_dosiero(dosiero_vojo, malnova_string):
    anstaŭigo = 0
    try:
        with open(dosiero_vojo, 'r', encoding='utf-8') as dosiero:
            dosiero_datoj = dosiero.read()

        nuna_dato_kaj_horo = datetime.datetime.now().strftime("%d-%m-%Y %H:%M:%S")
        nova_string_kun_dato_horo = f"@{nuna_dato_kaj_horo}@"

        dosiero_datoj, anstaŭigo = dosiero_datoj.replace(malnova_string, nova_string_kun_dato_horo), dosiero_datoj.count(malnova_string)

        with open(dosiero_vojo, 'w', encoding='utf-8') as dosiero:
            dosiero.write(dosiero_datoj)

        print(f"sukcese anstatauxis!")
    except FileNotFoundError:
        print(f"Dosiero '{dosiero_vojo}' ne trovita.")
    except Exception as e:
        print(f"Eraro okazis: {str(e)}")
    return anstaŭigo

# Ekzemplo de uzo:
dosiero_vojo = "eoth-vortaro.js"
malnova_string = "++"

anstaŭigo = anstataŭigi_string_en_dosiero(dosiero_vojo, malnova_string)
print(f"anstatauxigintaj fojoj: {anstaŭigo}")
# preni al terminalo
# python lasta_sxangxo.py
