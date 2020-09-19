import requests
import bs4

forms = requests.get('https://forms.gle/37T5ybn3b4jnUtzYA')
soup = bs4.BeautifulSoup(forms.text,'lxml')

# questions = soup.find_all('div', {'class':'freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont'})
# for i in range(len(questions)):
#     try:
#         print(questions[i].text)
#     except:
#         continue

# # Get questions only
# title = soup.find_all('div', {'class':'freebirdFormviewerViewHeaderTitle exportFormTitle freebirdCustomFont'})
# print(title[0].text)

# # Get Inputs
# inputs = soup.find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
# for i in range(len(inputs)):
#     try:
#         print(inputs[i].text)
#     except:
#         continue
questionsNum = soup.find_all('div', {'class':'freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont'})

# print(questionBox)
for i in range(len(questionsNum)):
    questionBox = soup.find_all('div', {'class':'freebirdFormviewerViewNumberedItemContainer'})
    questionTitle = questionBox[i].find('div', {'class':'freebirdFormviewerComponentsQuestionBaseHeader'})
    print(questionTitle.text)

    optionsNum = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
    
    for z in range(len(optionsNum)):
        option = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
        print(option[z].text)
# appsMaterialWizToggleRadiogroupElContainer exportContainerEl docssharedWizToggleLabeledControl freebirdThemedRadio freebirdThemedRadioDarkerDisabled

