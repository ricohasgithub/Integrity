import requests
import bs4

forms = requests.get('https://forms.gle/37T5ybn3b4jnUtzYA')
soup = bs4.BeautifulSoup(forms.text,'lxml')

testTitle = soup.find('div', {'class':'freebirdFormviewerViewHeaderTitleRow'})
print(testTitle.text)

questionsNum = soup.find_all('div', {'class':'freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont'})

for i in range(len(questionsNum)):
    questionBox = soup.find_all('div', {'class':'freebirdFormviewerViewNumberedItemContainer'})
    questionTitle = questionBox[i].find('div', {'class':'freebirdFormviewerComponentsQuestionBaseHeader'})
    print(questionTitle.text)

    optionsNum = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
    
    for z in range(len(optionsNum)):
        option = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
        print(option[z].text)