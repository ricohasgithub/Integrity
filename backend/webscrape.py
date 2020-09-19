import requests
import bs4
import json

def get_test_info(form_url):
    forms = requests.get(form_url)
    soup = bs4.BeautifulSoup(forms.text,'lxml')

    # Get test title
    testTitle = soup.find('div', {'class':'freebirdFormviewerViewHeaderTitleRow'})

    # Get test description
    testDescription = soup.find('div', {'class':'freebirdFormviewerViewHeaderDescription'})

    allQuestions = []
    questionsNum = soup.find_all('div', {'class':'freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont'})
    for i in range(len(questionsNum)):
        questionBox = soup.find_all('div', {'class':'freebirdFormviewerViewNumberedItemContainer'})

        # Get question being asked
        questionTitle = questionBox[i].find('div', {'class':'freebirdFormviewerComponentsQuestionBaseHeader'})
        questionTitle = questionTitle.text
        
        allOptions = []
        
        optionsNum = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
        
        # Gets options user can select
        for z in range(len(optionsNum)):
            option = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
            allOptions.append(option[z].text)
        
        # Identify Question Type
        questionType = questionBox[i].find('div', {'class':'appsMaterialWizToggleRadiogroupOffRadio exportOuterCircle'})
        if questionType == None:
            questionType = questionBox[i].find('div', {'class':'quantumWizTogglePapercheckboxInnerBox exportInnerBox'})
            if questionType == None:
                questionType = 'Written Response'
            else: 
                questionType = 'Checkboxes' 
        else:
            questionType = 'Multiple Choice'

        # Question Info
        values = {
        'questionTitle':questionTitle,
        'questionType':questionType,
        'options':allOptions
        }

        allQuestions.append(values)

    # Puts everything into JSON
    info = {
        'testTitle' : testTitle.text,
        'testDescription' : testDescription.text,
        'questions':allQuestions
    }

    return info

if __name__ == '__main__':
    print(get_test_info('https://forms.gle/37T5ybn3b4jnUtzYA'))