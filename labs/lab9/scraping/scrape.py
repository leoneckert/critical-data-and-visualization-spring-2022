import requests
import json
from bs4 import BeautifulSoup
from pprint import pprint
print("works!")

# 1. download a web page in plain text
# lexie:
# url = "https://wheresthejump.com/full-movie-list/"
# jiapei:
url = "https://www.imdb.com/event/ev0000091/2022/1/"
# cindy:
# url_start = "https://www.serebii.net/pokemon/gen"
# url_end = "pokemon.shtml"
# data = []
# for i in range(1, 9):
#     url = url_start + str(i) + url_end
#     result = requests.get(url)
#     print("scraping", url)


result = requests.get(url)

# print(result)
plain_result = result.text


# 2. turn plain text into structured html object
#       with the library called Beautiful Soup

soup = BeautifulSoup(result.text, 'html.parser')
# print(soup)

# 3. Traverse the html structure to find info we need
#       and save all that info into a nicely structured object / dictionairy

# # lexie:
# table_of_interest = soup.select_one(".table-movie")
# # print(table_of_interest)
# rows = table_of_interest.select("tr")
# # print(rows[0])
# # find more info on the url in tr
# data = []
# for row in rows:
#     # print(row)
#     cells = row.select("td")
#     # print(cells)
#     # link_src = cells[0].select_one("a")["href"]
    
#     data.append({
#         "title": cells[0].text,
#         "director": cells[1].text
#     })
#     print("-"*50)

# pprint(data)

# jiapei:
scripts = soup.select("script")
# print(scripts)
target_string = "IMDbReactWidgets.NomineesWidget.push(['center-3-react',"
data = {}
for script in scripts:
    # print(script.text[:50])
    if target_string in script.text:
        # print(script.text.split(target_string)[1].split("]);")[0])
        data_string = script.text.split(target_string)[1].split("]);")[0]
        data_object = json.loads(data_string)
        # pprint(data_object)
        awards = data_object["nomineesWidgetModel"]["eventEditionSummary"]["awards"]
        pprint(awards[0])
        data = {
            "year": 2020,
            "data": awards[0]
        }
    # print("-"*50)


# # 4. save the dictionairy as a data.json file. DONE
with open("data.json", "w") as outfile:
    json.dump(data, outfile, indent=4)

