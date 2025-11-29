package com.request2w1n.api.modules.auth.repositories;

import com.request2w1n.api.modules.auth.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    public UserEntity findByEmail (String email);
    public boolean findByPassword (String password);
    public boolean existsByEmail(String email);
//репозиторий является интерфейсом, который наследуется от другого интерфейса JpaRepository<>
//для него необходимо указать с какой сущность он должен работать, у нас это User
//и тип данных у поля id данной сущности, у нас это Integer
}
