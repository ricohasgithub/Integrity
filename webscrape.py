import requests
import bs4

forms = requests.get('https://forms.gle/37T5ybn3b4jnUtzYA')
soup = bs4.BeautifulSoup(forms.text,'lxml')


questions = soup.find_all('div', {'class':'freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont'})
for i in range(len(questions)):
    try:
        print(questions[i].text)
    except:
        continue

# Get questions only
title = soup.find_all('div', {'class':'freebirdFormviewerViewHeaderTitle exportFormTitle freebirdCustomFont'})
print(title[0].text)

# Get Inputs
inputs = soup.find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
for i in range(len(inputs)):
    try:
        print(inputs[i].text)
    except:
        continue
# for i in inputs:
#     print ((i.attrs['name']).split(".")[1])


# x = soup.get('heading')
# print(x)