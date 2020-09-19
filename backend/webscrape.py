import requests
import bs4
import json

# def get_title():
#     testTitle = soup.find('div', {'class':'freebirdFormviewerViewHeaderTitleRow'})
#     return testTitle.text

# def get_description():
#     testDescription = soup.find('div', {'class':'freebirdFormviewerViewHeaderDescription'})
#     return testDescription.text

# def get_question(i):
#     return values

def get_test_info(form_url):
    forms = requests.get(form_url)
    soup = bs4.BeautifulSoup(forms.text,'lxml')

    testTitle = soup.find('div', {'class':'freebirdFormviewerViewHeaderTitleRow'})

    testDescription = soup.find('div', {'class':'freebirdFormviewerViewHeaderDescription'})

    allQuestions = []
    questionsNum = soup.find_all('div', {'class':'freebirdFormviewerComponentsQuestionBaseTitle exportItemTitle freebirdCustomFont'})
    for i in range(len(questionsNum)):
        questionBox = soup.find_all('div', {'class':'freebirdFormviewerViewNumberedItemContainer'})
        questionTitle = questionBox[i].find('div', {'class':'freebirdFormviewerComponentsQuestionBaseHeader'})
        questionTitle = questionTitle.text
        
        allOptions = []
        
        optionsNum = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
        
        for z in range(len(optionsNum)):
            option = questionBox[i].find_all('div', {'class':'docssharedWizToggleLabeledPrimaryText'})
            allOptions.append(option[z].text)
        
        values = {
        'questionTitle':questionTitle,
        'options':allOptions
        }

        allQuestions.append(values)

    info = {
        'testTitle' : testTitle.text,
        'testDescription' : testDescription.text,
        'questions':allQuestions
    }

    return info

if __name__ == '__main__':
    print(get_test_info('https://forms.gle/37T5ybn3b4jnUtzYA'))