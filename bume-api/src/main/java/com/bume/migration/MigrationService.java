package com.bume.migration;

import io.quarkus.liquibase.LiquibaseFactory;
import liquibase.Liquibase;
import liquibase.changelog.ChangeSetStatus;
import liquibase.exception.LiquibaseException;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class MigrationService {

    @Inject
    LiquibaseFactory liquibaseFactory;

    public void checkMigration() {
        try (Liquibase liquibase = liquibaseFactory.createLiquibase()) {
            List<ChangeSetStatus> status = liquibase.getChangeSetStatuses(liquibaseFactory.createContexts(), liquibaseFactory.createLabels());
        } catch (LiquibaseException e) {
            throw new RuntimeException(e);
        }
    }
}