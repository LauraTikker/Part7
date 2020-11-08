const { number } = require("prop-types")

describe('Blogs app', function() {

    beforeEach(function()   {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')    
        const user = {      
            name: 'Laura Mand',      
            username: 'LauraMand',      
            password: '12345'    
        }    
        cy.request('POST', 'http://localhost:3001/api/users/', user) 
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function()   {
        cy.contains('Blogs')
    })

    it('login form can be opened', function()   {
        cy.contains('Log in')
    })

    it('user can log in', function()   {
        cy.contains('Log in').click()
        cy.get('#username').type('LauraMand')
        cy.get('#password').type('12345')
        cy.get('#login-button').click()
        cy.contains('Create new post')
        cy.contains('Laura Mand logged in')
    })

    it('user cannot log in, when password is wrong', function()   {
        cy.contains('Log in').click()
        cy.get('#username').type('LauraMand')
        cy.get('#password').type('wrong')
        cy.get('#login-button').click()
        cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'Laura Mand logged in')
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'LauraMand', password: '12345'})
        })

        it('A new blog can be created', function() {
            cy.contains('Create new post').parent().find('button').click()
            cy.get('#title').type('Kuusepuud')
            cy.get('#author').type('Laura Mand')
            cy.get('#url').type('www.kuusepuud.com')
            cy.get('#submit-post').click()
            cy.get('.notice')
            .should('contain', 'New blog Kuusepuud created Laura Mand')
            .and('have.css', 'color', 'rgb(173, 255, 47)')
            .and('have.css', 'border-style', 'solid')
            cy.get('.blog').should('have.length', 1)

        })

        describe('after blog is created', function() {
            beforeEach(function() {
                cy.contains('Create new post').parent().find('button').click()
                cy.get('#title').type('Kuusepuud')
                cy.get('#author').type('Laura Mand')
                cy.get('#url').type('www.kuusepuud.com')
                cy.get('#submit-post').click()
            })

            it('a blog can be liked', function() {
                cy.get('.blog').should('have.length', 1)
                cy.get('#blog-details-button').click()
                cy.get('.blog-details').should('contain', 'Likes: 0')
                cy.get('#likes-button').click()
                cy.get('.blog-details').should('contain', 'Likes: 1')
            })

            it('a blog can be deleted by author', function() {
                cy.get('.blog').should('have.length', 1)
                cy.get('#blog-details-button').click()
                cy.get('.delete-blog').click()
                cy.get('.blog').should('have.length', 0)
            })

            it('a blog cannnot be deleted by another person', function() {
                const user = {      
                    name: 'Tanel Kuusk',      
                    username: 'TanelKuusk',      
                    password: '56789'    
                }    
                cy.request('POST', 'http://localhost:3001/api/users/', user)
                cy.login({ username: 'TanelKuusk', password: '56789'})
                cy.get('.blog').should('have.length', 1)
                cy.get('#blog-details-button').click()
                cy.get('.blog-details').should('not.contain', '.delete-blog')
                cy.get('.blog').should('have.length', 1)
            })
        })
        
        describe('many blogs', function()   {
            beforeEach(function() {
                cy.login({ username: 'LauraMand', password: '12345'})
                let i = 0
                for(i; i < 5; i++) {
                    makeblogs(i)
                }
            })

            const makeblogs = (number) => {
                cy.createBlog({ 
                    title: `Blog titled nr ${number}`,      
                    author: `Blog author nr ${number}`,      
                    url: `Blog url nr ${number}`,
                    likes: number
                })
            }

            it('sort blogs depending from the amount of likes', function() {
                cy.get('.blog').should('have.length', 5)
                cy.get('.blog').eq(0).find('#blog-details-button').click().get('.blog-details').should('contain', 'Likes: 4')
                cy.get('.blog').eq(1).find('#blog-details-button').click().get('.blog-details').should('contain', 'Likes: 3')    
                cy.get('.blog').eq(2).find('#blog-details-button').click().get('.blog-details').should('contain', 'Likes: 2')
                cy.get('.blog').eq(3).find('#blog-details-button').click().get('.blog-details').should('contain', 'Likes: 1')
                cy.get('.blog').eq(4).find('#blog-details-button').click().get('.blog-details').should('contain', 'Likes: 0')
            })
        })
    })
})
