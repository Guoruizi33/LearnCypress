describe('登陆web网站案例', function () {

    var metricsData = ["Velocity", "Cycle time", "Classification"]

    beforeEach(() => {
        cy.visit('http://localhost:4200/dora/home')
        cy.fixture('project.json').as('project')

        cy.visit({            
            url: 'localhost:3001/kanban/verify',
            method: 'GET',
            body: {
                type: 'jira',
                site: 'ruizi',
                project: 'CJ2',
                boardId: '8',
                startTime:'1591718400000',
                token: 'Basic cnpndW9AdGhvdWdodHdvcmtzLmNvbTplZHdGRGlhR2lOMGtsTlVQY2hDOUEyMTM=',
            }
         })
    })
    metricsData.forEach((event) => {
        it("create project for different meterics", function () {
            cy.get('.mat-raised-button').last().click()

            cy.url().should('include', '/config')

            let projectName = this.project.projectName
            cy.get('#mat-input-0').type(projectName)
                .should('have.value', projectName)

            cy.get('[type="submit"]').should('be.disabled')

            cy.get('.mat-select-placeholder').click()

            cy.get('[ng-reflect-value="' + event + '"] .mat-option-pseudo-checkbox').click()

        })
    })
})