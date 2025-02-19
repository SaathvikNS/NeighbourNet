from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep
import random


options = webdriver.ChromeOptions()
options.add_argument("--force-device-scale-factor=1")

driver = webdriver.Chrome(options=options)

driver.implicitly_wait(10)

driver.get("http://localhost:3000/")

print(driver.title)

driver.maximize_window()
sleep(1)

driver.find_element(By.XPATH, '//*[@id="landing"]/div[2]/div/a').click()
sleep(1)

driver.execute_script("window.scrollBy(0,document.body.scrollHeight)")
sleep(1)

driver.find_element(By.PARTIAL_LINK_TEXT, 'About').click()
sleep(1)

driver.execute_script("window.scrollBy(0,document.body.scrollHeight)")
sleep(1)

driver.find_element(By.LINK_TEXT, 'Contact').click()
sleep(1)
    
driver.find_element(By.ID, 'login').click()
sleep(1)

driver.find_element(By.NAME, 'email').send_keys('tester@testmail.com')
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'input[type="password"]').send_keys('1234567890')
sleep(1)

driver.find_element(By.CLASS_NAME, 'visibility-button').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'button.visibility-button').click()
sleep(1)

driver.find_element(By.XPATH, '/html/body/div[2]/div[3]/div/div/div[1]/div/form/button').click()
sleep(1)

print(driver.current_url)

random_number = random.randint(1, 5)
for i in range(random_number):
    driver.find_element(By.TAG_NAME, 'input').send_keys('To Do test ', i+1)
    sleep(1)

    driver.find_element(By.CSS_SELECTOR, 'button#addButton').click()
    sleep(1)

checkboxes = driver.find_elements(By.CSS_SELECTOR, 'ul.todoHolder li button.check')
for i in range(len(checkboxes)//2):
    print("checking")
    driver.find_element(By.CSS_SELECTOR, 'ul.todoHolder li button.check').click()
    sleep(1)

driver.find_element(By.CSS_SELECTOR, 'button[tabindex="-1"]').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'button[tabindex="-1"]').click()
sleep(1)

deleteButtons = driver.find_elements(By.CSS_SELECTOR, 'ul.todoHolder li button.del')
for i in range(len(deleteButtons)):
    print("deleting")
    driver.find_element(By.CSS_SELECTOR, 'ul.todoHolder li button.del').click()
    sleep(1)

driver.find_element(By.CSS_SELECTOR, 'button[tabindex="-1"]').click()
sleep(1)

unCheckboxes = driver.find_elements(By.CSS_SELECTOR, 'ul.completedTodoHolder li button.check')
for i in range(len(unCheckboxes)//2):
    print("unchecking")
    driver.find_element(By.CSS_SELECTOR, 'ul.completedTodoHolder li button.uncheck').click()
    sleep(1)

driver.find_element(By.CSS_SELECTOR, 'ul.completedTodoHolder li button.del').click()

driver.find_element(By.CSS_SELECTOR, 'button[tabindex="-1"]').click()
sleep(1)

deleteButtons = driver.find_elements(By.CSS_SELECTOR, 'ul.todoHolder li button.del')
for i in range(int(len(deleteButtons)/2)):
    print("deleting")
    driver.find_element(By.CSS_SELECTOR, 'ul.todoHolder li button.del').click()
    sleep(1)

driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[2]/div/div/div[3]/div[2]/div/button[1]').click()
sleep(1)

driver.find_element(By.NAME, 'title').send_keys("Test Help Request")
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'textarea[name="description"]').send_keys("This the help request created for testing...")
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'form > button').click()
sleep(1)

driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[2]/div/div/div[3]/div[2]/div/button[2]').click()
sleep(1)

driver.find_element(By.NAME, 'title').send_keys("Test Resource Request")
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'textarea[name="description"]').send_keys("This the Resource request created for testing...")
sleep(1)

driver.find_element(By.CSS_SELECTOR, '.category > div > input').send_keys("Computers and IT Equipment")
sleep(1)

print(driver.find_element(By.CSS_SELECTOR, '.MuiPopper-root').get_attribute('innerHTML'))
driver.find_element(By.CSS_SELECTOR, '.MuiPopper-root > div > ul > li').click()

driver.find_element(By.CSS_SELECTOR, 'form > button').click()
sleep(1)

driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[2]/div/div/div[3]/div[2]/div/button[3]').click()
sleep(1)

driver.find_element(By.NAME, 'title').send_keys("Birthday")
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'textarea[name="description"]').send_keys("This the event description for testing...")
sleep(1)

driver.find_element(By.NAME, 'date').send_keys("06152025")
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'form > button').click()
sleep(1)

driver.find_element(By.ID, 'drawerButton').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, '.helpRequest').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'button[tabindex="-1"]').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, '.resourceRequest').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, 'button[tabindex="-1"]').click()
sleep(1)

driver.find_element(By.ID, 'drawerButton').click()
sleep(1)

driver.find_element(By.CSS_SELECTOR, '.dashBoard').click()
sleep(1)

recentActivity = driver.find_element(By.XPATH, '//*[@id="root"]/div/div/div[2]/div[2]/div/div/div[2]/div[1]/div/ul/li[1]').text
print("Most Recent Activity: ", recentActivity)

driver.find_element(By.ID, 'profile').click()
sleep(1)

driver.find_element(By.ID, 'logOut').click()
sleep(1)

driver.back()
sleep(1)

if not driver.find_elements(By.CSS_SELECTOR, 'svg[data-testid="SentimentDissatisfiedIcon"]'):
    print("Logout Unsuccessful!")
    driver.quit()

print("Logout Successfull!")

driver.forward()
sleep(1)

driver.refresh()
sleep(2)

driver.close()